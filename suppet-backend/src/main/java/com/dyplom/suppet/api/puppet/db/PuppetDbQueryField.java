package com.dyplom.suppet.api.puppet.db;

public class PuppetDbQueryField {
    String op;
    String field;
    String value;

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "[" +
                "\"" + op + "\"," +
                "\"" + field + "\"," +
                "\"" + value + "\"" +
                ']';
    }
}
