package com.dyplom.suppet.service.puppetdb;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.common.AbstractBrowserService;
import com.dyplom.suppet.service.common.CurlUtils;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;

public abstract class AbstractPuppetDbService extends AbstractBrowserService {
    private final Logger log;

    protected AbstractPuppetDbService(String serviceName) {
        log = LoggerFactory.getLogger(serviceName);
    }

    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[0];
    }

    protected String getBaseUrl() {
        return "https://puppet-db.home:8081/pdb/query/v4/";
    }

    protected abstract String getBaseEndpointName();

    @Override
    protected ArrayList<String> getFetchDataCommand(UniversalBrowserParams params, String additionalUrl) {
        return PuppetDbCurlUtils.getDataCommand(params, getFullUrl(additionalUrl));
    }

    public Integer getTotalRowCount(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        ArrayList<String> command = PuppetDbCurlUtils.getTotalRowCountCommand(params, getFullUrl(additionalUrl));
        Process p = CurlUtils.getProcess(command);
        String data = PuppetDbCurlUtils.getTotalRowCountFromProcess(p);
        String[] splittedData;
        if (data != null && (splittedData = data.split(": ")).length == 2) {
            return Integer.valueOf(splittedData[1]);
        }
        return null;
    }

    protected String getFullUrl(String additionalUrl) {
        return this.getBaseUrl() + this.getBaseEndpointName() + additionalUrl;
    }
}
