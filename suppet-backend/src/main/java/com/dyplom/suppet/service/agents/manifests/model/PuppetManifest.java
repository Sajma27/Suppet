package com.dyplom.suppet.service.agents.manifests.model;

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
}
