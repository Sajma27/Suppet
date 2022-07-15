package com.dyplom.suppet.service.agents.classes;

import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;
import org.springframework.stereotype.Service;

@Service
public class PuppetAgentsClassesService extends AbstractPuppetFilesBrowserCRUDService<PuppetManifest> {

    @Override
    protected String getLocationDir() {
        return "/etc/puppetlabs/code/environments/production/manifests/agents/classes";
    }

    @Override
    protected String getFilename(PuppetManifest manifest) {
        return manifest.getName() + ".pp";
    }

    @Override
    protected void modifyDtoBeforeEditOperation(PuppetManifest manifest) {
        super.modifyDtoBeforeEditOperation(manifest);
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[0];
    }
}
