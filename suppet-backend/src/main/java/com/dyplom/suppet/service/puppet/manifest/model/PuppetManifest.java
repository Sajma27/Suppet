package com.dyplom.suppet.service.puppet.manifest.model;

public class PuppetManifest {
    private String content;

    public PuppetManifest() {
    }

    public PuppetManifest(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
