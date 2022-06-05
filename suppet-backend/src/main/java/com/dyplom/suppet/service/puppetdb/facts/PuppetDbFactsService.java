package com.dyplom.suppet.service.puppetdb.facts;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;

@Service
public class PuppetDbFactsService extends AbstractPuppetDbService {

    PuppetDbFactsService() {
        super("PuppetDbFactsService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "facts";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
                new UniversalBrowserHeader("value", "Wartość"),
        };
    }

    @Override
    public JsonNode fetchData(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        if (!hasCertnameParam(params)) {
            return new ObjectMapper().readTree("[]");
        }
        return super.fetchData(params, additionalUrl);
    }

    @Override
    public Integer getTotalRowCount(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        if (!hasCertnameParam(params)) {
            return 0;
        }
        return super.getTotalRowCount(params, additionalUrl);
    }

    private boolean hasCertnameParam(UniversalBrowserParams params) {
        return Arrays.stream(params.getQuery()).anyMatch(queryField -> "certname".equals(queryField.getField()));
    }
}
