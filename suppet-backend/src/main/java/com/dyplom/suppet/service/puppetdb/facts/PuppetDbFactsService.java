package com.dyplom.suppet.service.puppetdb.facts;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

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
}
