package com.dyplom.suppet.service.puppetdb.events;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.common.UniversalBrowserHeaderTypes;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbEventCountsService extends AbstractPuppetDbService {

    PuppetDbEventCountsService() {
        super("PuppetDbEventCountsService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "event-counts";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("certname", "Agent"),
                new UniversalBrowserHeader("name", "Nazwa"),
                new UniversalBrowserHeader("run_start_time", "Czas rozpoczęcia", UniversalBrowserHeaderTypes.DATETIME),
                new UniversalBrowserHeader("run_end_time", "Czas zakończenia", UniversalBrowserHeaderTypes.DATETIME),
                new UniversalBrowserHeader("status", "Status"),
        };
    }
}
