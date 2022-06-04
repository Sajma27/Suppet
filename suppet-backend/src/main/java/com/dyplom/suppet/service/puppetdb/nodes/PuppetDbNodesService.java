package com.dyplom.suppet.service.puppetdb.nodes;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.common.UniversalBrowserHeaderTypes;
import com.dyplom.suppet.service.puppetdb.AbstractPuppetDbService;
import org.springframework.stereotype.Service;

@Service
public class PuppetDbNodesService extends AbstractPuppetDbService {

    PuppetDbNodesService() {
        super("PuppetNodesService");
    }

    @Override
    protected String getBaseEndpointName() {
        return "nodes";
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("certname", "Agent"),
                new UniversalBrowserHeader("facts_timestamp", "Data ostatniej aktualizacji", UniversalBrowserHeaderTypes.DATETIME),
                new UniversalBrowserHeader("latest_report_status", "Status ostatniego raportu"),
        };
    }
}
