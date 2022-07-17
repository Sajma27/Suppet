package com.dyplom.suppet.service.classes.model;

import com.dyplom.suppet.service.classes.model.enums.PuppetParamType;

public class PuppetParam {
    String name = null;
    String value = null;
    PuppetParamType type = null;

    public PuppetParam() {
    }

    public PuppetParam(String name) {
        this.name = name;
    }

    public PuppetParam(String name, String value, PuppetParamType type) {
        this.name = name;
        this.value = value;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public PuppetParamType getType() {
        return type;
    }

    public void setType(PuppetParamType type) {
        this.type = type;
    }
}
