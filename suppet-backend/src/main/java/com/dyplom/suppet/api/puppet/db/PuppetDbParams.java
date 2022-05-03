package com.dyplom.suppet.api.puppet.db;

import java.util.Map;

public class PuppetDbParams {
    PuppetDbQueryField[] query;
    long offset;
    long limit;
    PuppetDbOrderByField[] orderBy;
    boolean includeTotal;
    Map<String, String> additionalParams;

    public PuppetDbQueryField[] getQuery() {
        return query;
    }

    public String getQueryAsString() {
        if (this.query == null) {
            return "";
        }
        StringBuilder query = new StringBuilder();
        if (this.query.length > 1) {
            query.append("[");
            for (PuppetDbQueryField field: this.query) {
                query.append(field);
            }
            query.append("]");
        } else if (this.query.length > 0) {
            query.append(this.query[0]);
        }
        return query.toString();
    }

    public void setQuery(PuppetDbQueryField[] query) {
        this.query = query;
    }

    public long getOffset() {
        return offset;
    }

    public void setOffset(long offset) {
        this.offset = offset;
    }

    public long getLimit() {
        return limit;
    }

    public void setLimit(long limit) {
        this.limit = limit;
    }

    public PuppetDbOrderByField[] getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(PuppetDbOrderByField[] orderBy) {
        this.orderBy = orderBy;
    }

    public boolean isIncludeTotal() {
        return includeTotal;
    }

    public void setIncludeTotal(boolean includeTotal) {
        this.includeTotal = includeTotal;
    }

    public Map<String, String> getAdditionalParams() {
        return additionalParams;
    }

    public void setAdditionalParams(Map<String, String> additionalParams) {
        this.additionalParams = additionalParams;
    }
}
