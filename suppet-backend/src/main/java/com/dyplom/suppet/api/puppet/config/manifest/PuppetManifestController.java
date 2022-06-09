package com.dyplom.suppet.api.puppet.config.manifest;

import com.dyplom.suppet.service.agents.manifests.PuppetManifestService;
import com.dyplom.suppet.service.agents.manifests.model.PuppetManifest;
import com.dyplom.suppet.service.puppet.validator.PuppetValidationException;
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

    @RequestMapping(value = "/getManifestFile", method = RequestMethod.GET)
    public PuppetManifest getAgentsManifestFile(@RequestParam String agent) {
        return manifestService.getAgentsManifestFile(agent);
    }

    @RequestMapping(value = "/setNewManifestFile", method = RequestMethod.POST)
    public boolean setNewManifestFile(@RequestBody PuppetManifest puppetManifest) throws PuppetValidationException {
        logger.info("Setting new manifest file");
        boolean result = manifestService.setManifestFile(puppetManifest);
        if (result) {
            logger.info("Success! New manifest file set.");
        } else {
            logger.error("Cannot set new manifest file!");
        }
        return result;
    }
}
