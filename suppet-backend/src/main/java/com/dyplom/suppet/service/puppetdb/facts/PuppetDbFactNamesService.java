package com.dyplom.suppet.service.puppetdb.facts;

import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbFactNamesService extends AbstractPuppetDbService {

    PuppetDbFactNamesService() {
        super("PuppetDbFactNamesService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "fact-names";
    }
}
