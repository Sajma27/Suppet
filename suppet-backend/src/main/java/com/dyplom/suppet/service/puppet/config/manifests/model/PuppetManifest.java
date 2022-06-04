package com.dyplom.suppet.service.puppet.config.manifests.model;

public class PuppetManifest {
    private String content;
    private String agent;

    public PuppetManifest() {
    }

    public PuppetManifest(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public String getAgent() {
        return agent;
    }
}
