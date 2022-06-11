package com.dyplom.suppet.service.agents.manifests;

import com.dyplom.suppet.service.agents.manifests.model.PuppetManifest;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import org.springframework.stereotype.Service;

@Service
public class PuppetManifestService extends AbstractPuppetFilesBrowserCRUDService<PuppetManifest> {

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
        };
    }

    @Override
    protected String getLocationDir() {
        return "/etc/puppetlabs/code/environments/production/manifests";
    }

    @Override
    protected String getFilename(PuppetManifest manifest) {
        return manifest.getName() + ".pp";
    }

}
