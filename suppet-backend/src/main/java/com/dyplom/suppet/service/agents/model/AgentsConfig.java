package com.dyplom.suppet.service.agents.model;

import java.util.HashMap;

public class AgentsConfig {
    private String environment;
    private String runinterval;

    public AgentsConfig() {
    }

    public AgentsConfig(String environment, String runinterval) {
        this.environment = environment;
        this.runinterval = runinterval;
    }

    public AgentsConfig(HashMap<String, String> configMap) {
        this.environment = configMap.get("environment");
        this.runinterval = configMap.get("runinterval");
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getRuninterval() {
        return runinterval;
    }

    public void setRuninterval(String runinterval) {
        this.runinterval = runinterval;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        if (environment != null) {
            sb.append("environment = ").append(environment).append("\n");
        }
        if (runinterval != null) {
            sb.append("runinterval = ").append(runinterval).append("\n");
        }
        sb.append("\n");
        return sb.toString();
    }
}
