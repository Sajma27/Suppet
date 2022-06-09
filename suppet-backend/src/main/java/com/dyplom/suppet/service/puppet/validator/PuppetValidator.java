package com.dyplom.suppet.service.puppet.validator;

import com.dyplom.suppet.service.common.BasePuppetFile;
import com.dyplom.suppet.service.common.CommandLineProcessResult;
import com.dyplom.suppet.service.common.CommandLineUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class PuppetValidator {

    private final static String TMP_MANIFEST_PATH = "/home/tmp";

    public static void validatePuppetFile(BasePuppetFile puppetFile) throws PuppetValidationException, IOException {
        if (puppetFile == null || puppetFile.getContent() == null) {
            throw new PuppetValidationException("Niekompletny plik");
        }
        String tmpManifestPath = getFilePath(puppetFile);
        try {
            if (writeManifestToTmFile(puppetFile)) {
                Process process = CommandLineUtils.getProcess(getValidationCommand(tmpManifestPath));
                CommandLineProcessResult result = CommandLineUtils.getDataFromProcess(process);
                if (!result.getData().isEmpty()) {
                    throw new PuppetValidationException(result.getData());
                }
            } else {
                throw new PuppetValidationException("Nie udało się stworzyć tymczasowego pliku manifestu");
            }
        } catch (IOException | InterruptedException e) {
            throw new PuppetValidationException(e.getMessage(), e);
        } finally {
            CommandLineUtils.deleteFile(tmpManifestPath);
        }
    }

    private static boolean writeManifestToTmFile(BasePuppetFile puppetFile) throws IOException {
        return CommandLineUtils.writeContentToFile(puppetFile.getContent(), getFilePath(puppetFile));
    }

    private static String getFilePath(BasePuppetFile puppetFile) {
        return TMP_MANIFEST_PATH + "/" + puppetFile.getName() + new Date().getTime() + ".pp";
    }

    private static ArrayList<String> getValidationCommand(String manifestPath) {
        return CommandLineUtils.getSudoPuppetCommand(Arrays.asList("parser", "validate", manifestPath));
    }
}
