package com.dyplom.suppet.service.puppetdb;

import com.dyplom.suppet.api.db.PuppetDbParams;
import com.dyplom.suppet.service.common.CurlUtils;
import com.dyplom.suppet.service.common.UniversalBrowserFullDto;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

public abstract class AbstractPuppetDbService {
    private final Logger log;

    protected AbstractPuppetDbService(String serviceName) {
        log = LoggerFactory.getLogger(serviceName);
    }

    protected String getBaseUrl() {
        return "https://puppet-db.home:8081/pdb/query/v4/";
    }

    protected abstract String getBaseEndpointName();

    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[0];
    }

    public JsonNode fetchData(PuppetDbParams params) throws IOException, InterruptedException {
        return fetchData(params, "");
    }

    public JsonNode fetchData(PuppetDbParams params, String additionalUrl) throws IOException, InterruptedException {
        return getData(params, additionalUrl);
    }

    public UniversalBrowserFullDto getFullPuppetData(PuppetDbParams params) throws IOException, InterruptedException {
        return getFullPuppetData(params, "");
    }

    public UniversalBrowserFullDto getFullPuppetData(PuppetDbParams params, String additionalUrl) throws IOException, InterruptedException {
        return getFullPuppetData(params, additionalUrl, null);
    }

    public UniversalBrowserFullDto getFullPuppetData(PuppetDbParams params, String additionalUrl, UniversalBrowserHeader[] headers) throws IOException, InterruptedException {
        UniversalBrowserFullDto fullDataDto = new UniversalBrowserFullDto();
        fullDataDto.setData(getData(params, additionalUrl));
        if (headers == null) {
            headers = getHeaders();
        }
        fullDataDto.setHeaders(headers);
        fullDataDto.setColumns(Arrays.stream(headers).map(UniversalBrowserHeader::getDataField).collect(Collectors.toList()));
        return fullDataDto;
    }

    public Integer getTotalRowCount(PuppetDbParams params, String additionalUrl) throws IOException, InterruptedException {
        ArrayList<String> command = PuppetDbCurlUtils.getTotalRowCountCommand(params, getFullUrl(additionalUrl));
        Process p = CurlUtils.getProcess(command);
        String data = PuppetDbCurlUtils.getTotalRowCountFromProcess(p);
        String[] splittedData;
        if (data != null && (splittedData = data.split(": ")).length == 2) {
            return Integer.valueOf(splittedData[1]);
        }
        return null;
    }

    private JsonNode getData(PuppetDbParams params, String additionalUrl) throws IOException, InterruptedException {
        ArrayList<String> command = PuppetDbCurlUtils.getDataCommand(params, getFullUrl(additionalUrl));
        Process p = CurlUtils.getProcess(command);
        StringBuilder data = CurlUtils.getDataFromProcess(p);
        return CurlUtils.getJsonNodeFromData(data);
    }

    private String getFullUrl(String additionalUrl) {
        return this.getBaseUrl() + this.getBaseEndpointName() + additionalUrl;
    }
}
