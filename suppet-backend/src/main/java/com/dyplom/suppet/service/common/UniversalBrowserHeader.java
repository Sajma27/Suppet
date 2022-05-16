package com.dyplom.suppet.service.common;

public class UniversalBrowserHeader {
    private String dataField;
    private String name;

    public UniversalBrowserHeader() {
    }

    public UniversalBrowserHeader(String dataField, String name) {
        this.dataField = dataField;
        this.name = name;
    }

    public String getDataField() {
        return dataField;
    }

    public void setDataField(String dataField) {
        this.dataField = dataField;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
