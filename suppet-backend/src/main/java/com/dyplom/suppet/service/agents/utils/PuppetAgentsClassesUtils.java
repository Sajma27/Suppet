package com.dyplom.suppet.service.agents.utils;

import com.dyplom.suppet.service.agents.model.Agent;
import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.classes.model.PuppetParam;
import com.dyplom.suppet.service.classes.model.enums.PuppetParamType;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;

import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class PuppetAgentsClassesUtils {
    private static final Pattern isNumberPattern = Pattern.compile("-?\\d+(\\.\\d+)?");

    private static final String CLASS_BEGIN = "class { ";
    private static final String CLASS_END = "}";
    private static final String CLASS_NAME_END = ":";
    private static final String PARAM_TO_VALUE_CONNECTOR = " => ";

    public static ArrayList<PuppetClass> getClassesFromAgentsManifest(PuppetManifest manifest) {
        PuppetClass currentClass = null;
        ArrayList<PuppetClass> classes = new ArrayList<>();
        for (String manifestsLine : manifest.getContent().lines().collect(Collectors.toList())) {
            if (manifestsLine.startsWith(CLASS_BEGIN)) {
                currentClass = getNextPuppetClass(currentClass, classes, manifestsLine);
            } else if (manifestsLine.startsWith(CLASS_END)) {
                currentClass = endCurrentClass(currentClass, classes);
            } else if (currentClass != null && manifestsLine.contains(PARAM_TO_VALUE_CONNECTOR)) {
                addParamToCurrentClass(currentClass, manifestsLine);
            }
        }
        return classes;
    }

    private static void addParamToCurrentClass(PuppetClass currentClass, String manifestsLine) {
        String[] paramParts = manifestsLine.split(PARAM_TO_VALUE_CONNECTOR);
        if (paramParts.length == 2) {
            String paramValue = paramParts[1].replaceAll("[\"{}]", "").trim();
            if (paramParts[1].contains("[") && paramParts[1].contains("]")) {
                paramValue = paramValue.replaceAll("],", "]").trim();
            } else {
                paramValue = paramValue.replaceAll(",", "").trim();
            }
            currentClass.getParams().add(new PuppetParam(paramParts[0].trim(), paramValue, getPuppetParamValueType(paramValue)));
        }
    }

    private static PuppetClass endCurrentClass(PuppetClass currentClass, ArrayList<PuppetClass> classes) {
        if (currentClass != null) {
            classes.add(currentClass);
        }
        return null;
    }

    private static PuppetClass getNextPuppetClass(PuppetClass currentClass, ArrayList<PuppetClass> classes, String manifestsLine) {
        if (currentClass != null) {
            classes.add(currentClass);
        }
        int beginOfClassName = CLASS_BEGIN.length();
        int endOfClassName = manifestsLine.indexOf(CLASS_NAME_END, beginOfClassName);
        String className = manifestsLine.substring(beginOfClassName, endOfClassName);
        currentClass = new PuppetClass(className);
        return currentClass;
    }

    private static PuppetParamType getPuppetParamValueType(String paramValue) {
        if (paramValue.startsWith("\"")) {
            return PuppetParamType.STRING;
        } else if (isNumeric(paramValue)) {
            return PuppetParamType.NUMERIC;
        } else if ("true".equals(paramValue) || "false".equals(paramValue)) {
            return PuppetParamType.BOOLEAN;
        }
        return PuppetParamType.ANY;
    }

    public static PuppetManifest getClassManifestForAgent(Agent agent) {
        ArrayList<String> classes = new ArrayList<>();
        for (PuppetClass puppetClass : agent.getClasses()) {
            PuppetAgentsClassesUtils.assignClassToAgent(classes, puppetClass);
        }
        String manifestContent = getAgentsClassPrefix(agent) + String.join("\n", classes) + getAgentsClassSuffix();
        return new PuppetManifest(manifestContent, agent.getName(), agent.getEnvironment());
    }

    private static void assignClassToAgent(ArrayList<String> classes, PuppetClass puppetClass) {
        StringBuilder sb = new StringBuilder();
        sb.append(CLASS_BEGIN).append(puppetClass.getName()).append(CLASS_NAME_END);
        addParamsValuesToClassName(puppetClass, sb);
        sb.append(CLASS_END);
        String nextClass = sb.toString();
        if (!classes.contains(puppetClass.getName())) {
            classes.add(nextClass);
        }
    }


    private static void addParamsValuesToClassName(PuppetClass puppetClass, StringBuilder sb) {
        puppetClass.getParams().forEach(param -> sb.append("\n").append(getParamForManifestFile(param)).append(","));
    }

    private static String getParamForManifestFile(PuppetParam param) {
        return param.getName().replace("$", "") + PARAM_TO_VALUE_CONNECTOR + getPuppetParamValueForManifestFile(param);
    }

    private static String getPuppetParamValueForManifestFile(PuppetParam param) {
        switch (param.getType()) {
            case STRING:
                if (param.getValue() != null && param.getValue().startsWith("\"")) {
                    return param.getValue();
                }
                return '"' + param.getValue() + '"';
            case BOOLEAN:
            case NUMERIC:
            default:
                return param.getValue();
        }
    }

    private static String getAgentsClassPrefix(Agent agent) {
        return getAgentsClassPrefix(agent.getName());
    }

    private static String getAgentsClassPrefix(String agentName) {
        return "node '" + agentName + "' {\n";
    }

    private static String getAgentsClassSuffix() {
        return "\n}";
    }

    private static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        return isNumberPattern.matcher(strNum).matches();
    }
}
