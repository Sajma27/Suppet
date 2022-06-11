package com.dyplom.suppet.api.manifests;

import com.dyplom.suppet.api.common.AbstractPuppetFilesBrowserCRUDController;
import com.dyplom.suppet.service.agents.manifests.PuppetManifestService;
import com.dyplom.suppet.service.agents.manifests.model.PuppetManifest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manifests")
@CrossOrigin
public class PuppetManifestsController extends AbstractPuppetFilesBrowserCRUDController<PuppetManifest> {

    @Autowired
    protected PuppetManifestsController(PuppetManifestService service) {
        super(service);
    }

}
