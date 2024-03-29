package com.dyplom.suppet.service.puppetdb.reports;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.common.UniversalBrowserHeaderTypes;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbReportsService extends AbstractPuppetDbService {

    PuppetDbReportsService() {
        super("PuppetDbReportsService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "reports";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("certname", "Agent"),
                new UniversalBrowserHeader("status", "Status"),
                new UniversalBrowserHeader("start_time", "Start", UniversalBrowserHeaderTypes.DATETIME),
                new UniversalBrowserHeader("end_time", "Koniec", UniversalBrowserHeaderTypes.DATETIME),
                new UniversalBrowserHeader("type", "Typ"),
        };
    }
}
