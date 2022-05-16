package com.dyplom.suppet.service.puppetdb.nodes;

import com.dyplom.suppet.service.common.UniversalBrowserHeader;
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
                new UniversalBrowserHeader("report_timestamp", "Data ostatniego raportu"),
                new UniversalBrowserHeader("latest_report_status", "Status ostatniego raportu"),
        };
    }
}
