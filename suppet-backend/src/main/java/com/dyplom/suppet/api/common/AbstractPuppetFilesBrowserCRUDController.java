package com.dyplom.suppet.api.common;

import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.BasePuppetFile;

public abstract class AbstractPuppetFilesBrowserCRUDController<DTO extends BasePuppetFile> extends AbstractBrowserCRUDController<DTO> {

    protected AbstractPuppetFilesBrowserCRUDController(AbstractPuppetFilesBrowserCRUDService<DTO> service) {
        super(service);
    }
}
