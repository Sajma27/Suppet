package com.dyplom.suppet.service.agents.model;

import com.dyplom.suppet.service.classes.model.PuppetClass;

import java.util.ArrayList;

public class Agent {
    private String name;
    private ArrayList<PuppetClass> classes;
    private String environment;
    private AgentsConfig config;

    public Agent() {
    }

    public Agent(String name, ArrayList<PuppetClass> classes, String environment) {
        this.name = name;
        this.classes = classes;
        this.environment = environment;
    }

    public Agent(String name, AgentsConfig config) {
        this.name = name;
        this.config = config;
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

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public AgentsConfig getConfig() {
        return config;
    }

    public void setConfig(AgentsConfig config) {
        this.config = config;
    }
}
