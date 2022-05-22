package com.dyplom.suppet.api.common;

public class UniversalBrowserParams {
    QueryField[] query;
    long offset;
    long limit;
    OrderByField[] orderBy;
    UniversalBrowserAdditionalParam[] additionalParams;

    public QueryField[] getQuery() {
        return query;
    }

    public String getQueryAsString() {
        if (this.query == null) {
            return "";
        }
        StringBuilder query = new StringBuilder();
        if (this.query.length > 1) {
            query.append("[\"and\"");
            for (QueryField field: this.query) {
                query.append(",").append(field);
            }
            query.append("]");
        } else if (this.query.length > 0) {
            query.append(this.query[0]);
        }
        return query.toString();
    }

    public void setQuery(QueryField[] query) {
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

    public OrderByField[] getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(OrderByField[] orderBy) {
        this.orderBy = orderBy;
    }

    public UniversalBrowserAdditionalParam[] getAdditionalParams() {
        return additionalParams;
    }

    public void setAdditionalParams(UniversalBrowserAdditionalParam[] additionalParams) {
        this.additionalParams = additionalParams;
    }
}
