package com.dyplom.suppet.service.agents.classes;

import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.BasePuppetFile;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;
import org.springframework.stereotype.Service;

@Service
public class PuppetAgentsClassesService extends AbstractPuppetFilesBrowserCRUDService<PuppetManifest> {

    @Override
    protected String getLocationDir(BasePuppetFile file) {
        return "/etc/puppetlabs/code/environments/" + file.getEnvironment() + "/manifests/agents/classes";
    }

    @Override
    protected String getFilename(PuppetManifest manifest) {
        return manifest.getName() + ".pp";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[0];
    }
}
