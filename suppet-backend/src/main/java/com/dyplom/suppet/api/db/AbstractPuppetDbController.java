package com.dyplom.suppet.api.db;

import com.dyplom.suppet.service.common.UniversalBrowserFullDto;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;

public abstract class AbstractPuppetDbController<SERVICE extends AbstractPuppetDbService> {

    protected SERVICE service;

    protected AbstractPuppetDbController(SERVICE service) {
        this.service = service;
    }

    @RequestMapping(value = "/fetchData",method = RequestMethod.POST)
    public JsonNode fetchData(@RequestBody PuppetDbParams params) throws IOException, InterruptedException {
        return service.fetchData(params);
    }

    @RequestMapping(value = "/getFullPuppetData", method = RequestMethod.POST)
    public UniversalBrowserFullDto getFullPuppetData(@RequestBody PuppetDbParams params) throws IOException, InterruptedException {
        return service.getFullPuppetData(params);
    }

    @RequestMapping(value = "/getTotalRowCount", method = RequestMethod.POST)
    public Integer getTotalRowCount(@RequestBody PuppetDbParams params) throws IOException, InterruptedException {
        return service.getTotalRowCount(params, "");
    }
}
