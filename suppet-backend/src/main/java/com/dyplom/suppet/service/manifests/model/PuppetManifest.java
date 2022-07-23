package com.dyplom.suppet.service.manifests.model;

import com.dyplom.suppet.service.common.BasePuppetFile;

public class PuppetManifest extends BasePuppetFile {

    public PuppetManifest() {
    }

    public PuppetManifest(String name) {
        super(name);
    }

    public PuppetManifest(String content, String name) {
        super(content, name);
    }

    public PuppetManifest(String content, String name, String environment) {
        super(content, name, environment);
    }
}
