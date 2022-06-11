package com.dyplom.suppet.service.classes;

import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import org.springframework.stereotype.Service;

@Service
public class PuppetClassesService extends AbstractPuppetFilesBrowserCRUDService<PuppetClass> {

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
        };
    }

    @Override
    protected String getLocationDir() {
        return "/etc/puppetlabs/code/environments/production/classes";
    }

    @Override
    protected String getFilename(PuppetClass puppetClass) {
        return puppetClass.getName() + ".pp";
    }
}
