package com.dyplom.suppet.api.puppet.config.manifest;

import com.dyplom.suppet.api.common.AbstractPuppetFilesBrowserCRUDController;
import com.dyplom.suppet.service.manifests.PuppetManifestService;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet/manifest")
@CrossOrigin
public class PuppetManifestController extends AbstractPuppetFilesBrowserCRUDController<PuppetManifest> {

    @Autowired
    protected PuppetManifestController(PuppetManifestService service) {
        super(service);
    }

}
