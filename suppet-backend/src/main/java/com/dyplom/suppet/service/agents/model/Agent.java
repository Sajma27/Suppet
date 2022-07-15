package com.dyplom.suppet.service.agents.model;

import com.dyplom.suppet.service.classes.model.PuppetClass;

import java.util.ArrayList;

public class Agent {
    private String name;
    private ArrayList<PuppetClass> classes;

    public Agent() {
    }

    public Agent(String name, ArrayList<PuppetClass> classes) {
        this.name = name;
        this.classes = classes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<PuppetClass> getClasses() {
        return classes;
    }

    public void setClasses(ArrayList<PuppetClass> classes) {
        this.classes = classes;
    }
}
