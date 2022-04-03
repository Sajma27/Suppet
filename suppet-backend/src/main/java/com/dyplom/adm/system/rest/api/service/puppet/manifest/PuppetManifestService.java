package com.dyplom.adm.system.rest.api.service.puppet.manifest;

import com.dyplom.adm.system.rest.api.service.puppet.manifest.model.PuppetManifest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Service
public class PuppetManifestService {

    public boolean setManifestFile(String newContent) {
        if (newContent == null) {
            return false;
        }
        Path defaultManifestPath = Paths.get("/etc/puppetlabs/code/environments/production/manifests/default.pp");

        try {
            Files.writeString(defaultManifestPath, newContent, StandardOpenOption.WRITE);
            String content = Files.readString(defaultManifestPath);

            if (content != null && content.equals(newContent)) {
                return true;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;
    }

    public PuppetManifest getCurrentManifestFile() {
        Path defaultManifestPath = Paths.get("/etc/puppetlabs/code/environments/production/manifests/default.pp");

        try {
            String content = Files.readString(defaultManifestPath);
            return new PuppetManifest(content);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
