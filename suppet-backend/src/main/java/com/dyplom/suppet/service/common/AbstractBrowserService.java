package com.dyplom.suppet.service.common;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

public abstract class AbstractBrowserService {

    protected abstract UniversalBrowserHeader[] getHeaders();

    public JsonNode fetchData(UniversalBrowserParams params) throws IOException, InterruptedException {
        return fetchData(params, "");
    }

    public JsonNode fetchData(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        ArrayList<String> command = getFetchDataCommand(params, additionalUrl);
        Process p = CurlUtils.getProcess(command);
        StringBuilder data = CurlUtils.getDataFromProcess(p);
        JsonNode jsonData = CurlUtils.getJsonNodeFromData(data);
        return applyAdditionalParams(params, jsonData);
    }

    protected JsonNode applyAdditionalParams(UniversalBrowserParams params, JsonNode data) {
        return data;
    }

    protected abstract ArrayList<String> getFetchDataCommand(UniversalBrowserParams params, String additionalUrl);

    public UniversalBrowserFullDto getFullBrowserData(UniversalBrowserParams params) throws IOException, InterruptedException {
        return getFullBrowserData(params, "");
    }

    public UniversalBrowserFullDto getFullBrowserData(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        return getFullBrowserData(params, additionalUrl, null);
    }

    public UniversalBrowserFullDto getFullBrowserData(UniversalBrowserParams params, String additionalUrl, UniversalBrowserHeader[] headers) throws IOException, InterruptedException {
        UniversalBrowserFullDto fullDataDto = new UniversalBrowserFullDto();
        fullDataDto.setData(fetchData(params, additionalUrl));
        if (headers == null) {
            headers = getHeaders();
        }
        fullDataDto.setHeaders(headers);
        fullDataDto.setColumns(Arrays.stream(headers).map(UniversalBrowserHeader::getDataField).collect(Collectors.toList()));
        return fullDataDto;
    }

    public Integer getTotalRowCount(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        JsonNode data = fetchData(params, additionalUrl);
        return data != null ? data.size() : 0;
    }
}
