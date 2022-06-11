package com.dyplom.suppet.service.modules.model;

import com.dyplom.suppet.service.common.BasePuppetFile;

public class PuppetModule extends BasePuppetFile {

    String version;

    public PuppetModule() {
    }

    public PuppetModule(String name) {
        super(name);
    }

    public PuppetModule(String name, String version) {
        super(name);
        this.version = version;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
