package com.dyplom.suppet.service.puppet.config.validator;

import com.dyplom.suppet.service.common.CommandLineProcessResult;
import com.dyplom.suppet.service.common.CommandLineUtils;
import com.dyplom.suppet.service.puppet.config.manifests.model.PuppetManifest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class PuppetValidator {

    private final static String TMP_MANIFEST_PATH = "/home/tmp";

    public static void validateManifest(PuppetManifest manifest) throws PuppetValidationException, IOException {
        if (manifest == null || manifest.getContent() == null) {
            throw new PuppetValidationException("Niekompletny manifest");
        }
        String tmpManifestPath = getAgentsManifestPath(manifest);
        try {
            if (writeManifestToTmFile(manifest)) {
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

    private static boolean writeManifestToTmFile(PuppetManifest manifest) throws IOException {
        return CommandLineUtils.writeContentToFile(manifest.getContent(), getAgentsManifestPath(manifest));
    }

    private static String getAgentsManifestPath(PuppetManifest manifest) {
        return TMP_MANIFEST_PATH + "/agents/" + manifest.getAgent() + ".pp";
    }

    private static ArrayList<String> getValidationCommand(String manifestPath) {
        return CommandLineUtils.getSudoPuppetCommand(Arrays.asList("parser", "validate", manifestPath));
    }
}
