package com.dyplom.suppet.service.manifest;

import com.dyplom.suppet.service.manifest.model.PuppetManifest;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PuppetManifestService {

    public boolean setManifestFile(String newContent) {
        if (newContent == null) {
            return false;
        }

        try {
//            Files.writeString(defaultManifestPath, newContent, StandardOpenOption.WRITE);
            FileWriter writer = new FileWriter("/etc/puppetlabs/code/environments/production/manifests/agents/puppet-agent-1.pp", false);
            writer.write(newContent);
            writer.close();

            Path defaultManifestPath = Paths.get("/etc/puppetlabs/code/environments/production/manifests/agents/puppet-agent-1.pp");
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
        Path defaultManifestPath = Paths.get("/etc/puppetlabs/code/environments/production/manifests/agents/puppet-agent-1.pp");

        try {
            String content = Files.readString(defaultManifestPath);
            return new PuppetManifest(content);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
