package com.dyplom.suppet.service.classes.model.enums;

public enum PuppetParamType {
    STRING("String"),
    BOOLEAN("Boolean"),
    NUMERIC("Numeric"),
    ANY("Any");

    private final String code;

    PuppetParamType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
