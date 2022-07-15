package com.dyplom.suppet.service.common;

public class BasePuppetFile {
    protected String content;
    protected String name;
    protected String environment = "production";

    public BasePuppetFile() {
    }

    public BasePuppetFile(String name) {
        int domainBeginIndex;
        if (name != null && (domainBeginIndex = name.lastIndexOf('.')) > -1) {
            this.name = name.substring(0, domainBeginIndex);
        } else {
            this.name = name;
        }
    }

    public BasePuppetFile(String content, String name) {
        this(name);
        this.content = content;
    }

    public BasePuppetFile(String content, String name, String environment) {
        this(content, name);
        this.environment = environment;
    }

    public String getContent() {
        return content;
    }

    public String getName() {
        return name;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }
}
