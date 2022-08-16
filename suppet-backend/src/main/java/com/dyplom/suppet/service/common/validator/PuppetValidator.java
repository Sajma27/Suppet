package com.dyplom.suppet.service.common.validator;

import com.dyplom.suppet.service.common.BasePuppetFile;
import com.dyplom.suppet.service.common.CommandLineProcessResult;
import com.dyplom.suppet.service.common.CommandLineUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class PuppetValidator {

    private final static String TMP_FILES_PATH = "/tmp";

    public static void validatePuppetFile(BasePuppetFile puppetFile) throws PuppetValidationException, IOException {
        if (puppetFile == null || puppetFile.getContent() == null) {
            throw new PuppetValidationException("Niekompletny plik");
        }
        String tmpValidationPath = getFilePath(puppetFile);
        boolean fileCreated = false;
        try {
            fileCreated = writeManifestToTmFile(puppetFile, tmpValidationPath);
            if (fileCreated) {
                Process process = CommandLineUtils.getProcess(getValidationCommand(tmpValidationPath));
                CommandLineProcessResult result = CommandLineUtils.getDataFromProcess(process);
                if (!result.getData().isEmpty()) {
                    throw new PuppetValidationException(result.getData());
                }
            } else {
                throw new PuppetValidationException("Nie udało się stworzyć tymczasowego pliku do walidacji");
            }
        } catch (IOException | InterruptedException e) {
            throw new PuppetValidationException(e.getMessage(), e);
        } finally {
            if (fileCreated) {
                CommandLineUtils.deleteFile(tmpValidationPath);
            }
        }
    }

    private static boolean writeManifestToTmFile(BasePuppetFile puppetFile, String path) throws IOException {
        return CommandLineUtils.writeContentToFile(puppetFile.getContent(), path);
    }

    private static String getFilePath(BasePuppetFile puppetFile) {
        return TMP_FILES_PATH + "/" + puppetFile.getName() + new Date().getTime() + ".pp";
    }

    private static ArrayList<String> getValidationCommand(String manifestPath) {
        return CommandLineUtils.getSudoPuppetCommand(Arrays.asList("parser", "validate", manifestPath));
    }
}
