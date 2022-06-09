package com.dyplom.suppet.service.agents.manifests;

import com.dyplom.suppet.service.agents.manifests.model.PuppetManifest;
import com.dyplom.suppet.service.common.CommandLineUtils;
import com.dyplom.suppet.service.puppet.validator.PuppetValidationException;
import com.dyplom.suppet.service.puppet.validator.PuppetValidator;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PuppetManifestService {

    private final static String MANIFESTS_PATH = "/etc/puppetlabs/code/environments/production/manifests";

    public boolean setManifestFile(PuppetManifest manifest) throws PuppetValidationException {
        try {
            PuppetValidator.validatePuppetFile(manifest);
            return CommandLineUtils.writeContentToFile(manifest.getContent(), getAgentsManifestPath(manifest.getName()));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public PuppetManifest getAgentsManifestFile(String agent) {
        Path defaultManifestPath = Paths.get(getAgentsManifestPath(agent));
        try {
            String content = Files.readString(defaultManifestPath);
            return new PuppetManifest(agent, content);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String getAgentsManifestPath(String agent) {
        return MANIFESTS_PATH + "/agents/" + agent + ".pp";
    }

}
