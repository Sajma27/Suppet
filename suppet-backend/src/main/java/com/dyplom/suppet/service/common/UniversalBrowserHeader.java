package com.dyplom.suppet.service.common;

public class UniversalBrowserHeader {
    private String dataField;
    private String name;
    private String type;

    public UniversalBrowserHeader() {
    }

    public UniversalBrowserHeader(String dataField, String name) {
        this.dataField = dataField;
        this.name = name;
        this.type = UniversalBrowserHeaderTypes.STRING;
    }

    public UniversalBrowserHeader(String dataField, String name, String type) {
        this.dataField = dataField;
        this.name = name;
        this.type = type;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
