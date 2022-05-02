package com.dyplom.suppet.api.puppet.db;

import com.dyplom.suppet.service.puppet.db.AbstractPuppetDbService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;

public abstract class AbstractPuppetDbController<SERVICE extends AbstractPuppetDbService> {

    protected SERVICE service;

    protected AbstractPuppetDbController(SERVICE service) {
        this.service = service;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public String getAll() throws IOException, InterruptedException {
        return service.getAll();
    }
}
