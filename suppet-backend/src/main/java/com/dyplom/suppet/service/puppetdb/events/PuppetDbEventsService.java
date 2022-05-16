package com.dyplom.suppet.service.puppetdb.events;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbEventsService extends AbstractPuppetDbService {

    PuppetDbEventsService() {
        super("PuppetDbEventsService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "events";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("certname", "Agent"),
                new UniversalBrowserHeader("name", "Nazwa"),
                new UniversalBrowserHeader("run_start_time", "Czas rozpoczęcia"),
                new UniversalBrowserHeader("run_end_time", "Czas zakończenia"),
                new UniversalBrowserHeader("status", "Status"),
        };
    }
}
