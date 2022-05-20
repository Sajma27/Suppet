package com.dyplom.suppet.api.common;

import com.dyplom.suppet.service.common.AbstractBrowserService;
import com.dyplom.suppet.service.common.UniversalBrowserFullDto;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;

public abstract class AbstractBrowserController<SERVICE extends AbstractBrowserService> {

    protected SERVICE service;

    protected AbstractBrowserController(SERVICE service) {
        this.service = service;
    }

    @RequestMapping(value = "/fetchData",method = RequestMethod.POST)
    public JsonNode fetchData(@RequestBody UniversalBrowserParams params) throws IOException, InterruptedException {
        return service.fetchData(params);
    }

    @RequestMapping(value = "/getFullBrowserData", method = RequestMethod.POST)
    public UniversalBrowserFullDto getFullBrowserData(@RequestBody UniversalBrowserParams params) throws IOException, InterruptedException {
        return service.getFullBrowserData(params);
    }

    @RequestMapping(value = "/getTotalRowCount", method = RequestMethod.POST)
    public Integer getTotalRowCount(@RequestBody UniversalBrowserParams params) throws IOException, InterruptedException {
        return service.getTotalRowCount(params, "");
    }
}
