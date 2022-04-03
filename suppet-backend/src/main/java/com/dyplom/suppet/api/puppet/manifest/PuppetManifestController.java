package com.dyplom.suppet.api.puppet.manifest;

import com.dyplom.suppet.service.puppet.manifest.PuppetManifestService;
import com.dyplom.suppet.service.puppet.manifest.model.PuppetManifest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/puppet/manifest")
@CrossOrigin
public class PuppetManifestController {
    private final Logger logger = LoggerFactory.getLogger("PuppetManifestController");
    private final PuppetManifestService manifestService;

    @Autowired
    public PuppetManifestController(PuppetManifestService manifestService) {
        this.manifestService = manifestService;
    }

    @RequestMapping(value = "/getCurrentManifestFile", method = RequestMethod.GET)
    public PuppetManifest getCurrentManifestFile() {
        return manifestService.getCurrentManifestFile();
    }

    @RequestMapping(value = "/setNewManifestFile", method = RequestMethod.POST)
    public boolean setNewManifestFile(@RequestBody PuppetManifest puppetManifest) {
        logger.info("Setting new manifest file");
        logger.info(puppetManifest.getContent());
        boolean result = manifestService.setManifestFile(puppetManifest.getContent());
        if (result) {
            logger.info("Success! New manifest file set.");
        } else {
            logger.error("Cannot set new manifest file!");
        }
        return result;
    }
}
