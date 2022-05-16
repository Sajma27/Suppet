package com.dyplom.suppet.service.puppetdb.status;

import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbStatusService extends AbstractPuppetDbService {

    PuppetDbStatusService() {
        super("PuppetDbStatusService");
    }

    @Override
    protected String getBaseUrl() {
        return "https://puppet-db.home:8081/status/v1/services/";
    }

    @Override
    protected String getBaseEndpointName() {
        return "puppetdb-status";
    }
}
