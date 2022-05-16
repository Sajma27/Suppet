package com.dyplom.suppet.service.common;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public class UniversalBrowserFullDto {
    private JsonNode data;
    private List<String> columns;
    private UniversalBrowserHeader[] headers;

    public JsonNode getData() {
        return data;
    }

    public void setData(JsonNode data) {
        this.data = data;
    }

    public List<String> getColumns() {
        return columns;
    }

    public void setColumns(List<String> columns) {
        this.columns = columns;
    }

    public UniversalBrowserHeader[] getHeaders() {
        return headers;
    }

    public void setHeaders(UniversalBrowserHeader[] headers) {
        this.headers = headers;
    }
}
