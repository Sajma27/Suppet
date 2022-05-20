package com.dyplom.suppet.api.db;

import com.dyplom.suppet.api.common.AbstractBrowserController;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;

public abstract class AbstractPuppetDbController<SERVICE extends AbstractPuppetDbService> extends AbstractBrowserController<SERVICE> {

    protected AbstractPuppetDbController(SERVICE service) {
        super(service);
    }

}
