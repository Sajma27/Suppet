package com.dyplom.suppet.service.classes.model;

import com.dyplom.suppet.service.common.BasePuppetFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class PuppetClass extends BasePuppetFile {
    ArrayList<String> params = new ArrayList<>();
    Map<String, String> paramsValues = new HashMap<>();

    public PuppetClass() {
    }

    public PuppetClass(String name) {
        super(name);
    }

    public PuppetClass(String content, String name) {
        super(content, name);
    }

    public PuppetClass(String content, String name, HashMap<String, String> paramsValues) {
        super(content, name);
        this.paramsValues = paramsValues;
    }

    public ArrayList<String> getParams() {
        return params;
    }

    public void setParams(ArrayList<String> params) {
        this.params = params;
    }

    public Map<String, String> getParamsValues() {
        return paramsValues;
    }

    public void setParamsValues(Map<String, String> paramsValues) {
        this.paramsValues = paramsValues;
    }
}
