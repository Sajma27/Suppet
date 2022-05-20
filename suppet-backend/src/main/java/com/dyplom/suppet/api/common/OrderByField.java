package com.dyplom.suppet.api.common;

public class OrderByField {
    String field;
    String order;

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "{" +
                "\"field\"=\"" + field + '\"' +
                ", \"order\"=\"" + order + '\"' +
                '}';
    }
}
