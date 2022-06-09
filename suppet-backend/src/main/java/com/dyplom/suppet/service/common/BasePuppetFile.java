package com.dyplom.suppet.service.common;

public class BasePuppetFile {
    protected String content;
    protected String name;

    public BasePuppetFile() {
    }

    public BasePuppetFile(String name) {
        this.name = name;
    }

    public BasePuppetFile(String content, String name) {
        this.content = content;
        this.name = name;
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
}
