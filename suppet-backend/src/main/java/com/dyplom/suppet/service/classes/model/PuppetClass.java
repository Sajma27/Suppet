package com.dyplom.suppet.service.classes.model;

import com.dyplom.suppet.service.common.BasePuppetFile;

public class PuppetClass extends BasePuppetFile {

    public PuppetClass() {
    }

    public PuppetClass(String name) {
        super(name);
    }

    public PuppetClass(String content, String name) {
        super(content, name);
    }
}
