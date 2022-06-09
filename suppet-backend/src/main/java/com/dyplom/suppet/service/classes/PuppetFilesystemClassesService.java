package com.dyplom.suppet.service.classes;

import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserWithCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import org.springframework.stereotype.Service;

@Service
public class PuppetFilesystemClassesService extends AbstractPuppetFilesBrowserWithCRUDService<PuppetClass> {

    private final static String CLASSES_PATH = "/etc/puppetlabs/code/environments/production/classes";

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
        };
    }

    @Override
    protected String getLocationDir() {
        return CLASSES_PATH;
    }

    @Override
    protected String getFilename(PuppetClass puppetClass) {
        return puppetClass.getName() + ".pp";
    }
}
