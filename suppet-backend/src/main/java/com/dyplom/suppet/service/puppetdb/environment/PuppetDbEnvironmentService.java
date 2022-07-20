package com.dyplom.suppet.service.puppetdb.environment;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbEnvironmentService extends AbstractPuppetDbService {

    PuppetDbEnvironmentService() {
        super("PuppetEnvironmentService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "environments";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa")
        };
    }
}
