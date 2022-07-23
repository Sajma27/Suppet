package com.dyplom.suppet.service.manifests;

import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.BasePuppetFile;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;
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
    protected String getLocationDir(BasePuppetFile file) {
        return "/etc/puppetlabs/code/environments/" + file.getEnvironment() + "/manifests";
    }

    @Override
    protected String getFilename(PuppetManifest manifest) {
        return manifest.getName() + ".pp";
    }

}
