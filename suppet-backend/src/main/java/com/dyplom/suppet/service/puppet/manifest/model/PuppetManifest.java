package com.dyplom.suppet.service.puppet.manifest.model;

public class PuppetManifest {
    private final String content;

    public PuppetManifest(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
