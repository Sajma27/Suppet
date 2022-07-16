package com.dyplom.suppet.service.classes.model;

import com.dyplom.suppet.service.common.BasePuppetFile;

import java.util.ArrayList;

public class PuppetClass extends BasePuppetFile {
    ArrayList<PuppetParam> params = new ArrayList<>();

    public PuppetClass() {
    }

    public PuppetClass(String name) {
        super(name);
    }

    public PuppetClass(String content, String name) {
        super(content, name);
    }

    public PuppetClass(String content, String name, ArrayList<PuppetParam> params) {
        super(content, name);
        this.params = params;
    }

    public void setParams(ArrayList<PuppetParam> params) {
        this.params = params;
    }

    public ArrayList<PuppetParam> getParams() {
        return params;
    }
}
