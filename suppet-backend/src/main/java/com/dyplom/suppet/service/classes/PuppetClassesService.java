package com.dyplom.suppet.service.classes;

import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.classes.model.PuppetParam;
import com.dyplom.suppet.service.classes.model.enums.PuppetParamType;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.BasePuppetFile;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidationException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class PuppetClassesService extends AbstractPuppetFilesBrowserCRUDService<PuppetClass> {
    private static final String PARAM_TYPE_PREFIX = "==>";
    private static final String NO_PARAMS = "NO PARAMS";

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
//                new UniversalBrowserHeader("params", "Parametry"),
        };
    }

    @Override
    public PuppetClass get(PuppetClass puppetClass) {
        puppetClass = super.get(puppetClass);
        if (puppetClass == null) {
            return null;
        }
        if (puppetClass.getContent() != null && !puppetClass.getContent().isEmpty()) {
            ArrayList<PuppetParam> params = getPuppetClassParamsFromClassHeader(puppetClass);
            puppetClass.setParams(params);
            removePrefixFromPuppetClass(puppetClass);
            removeSuffixFromPuppetClass(puppetClass);
            addTypesToClassContentVariables(puppetClass);
            puppetClass.setContent(puppetClass.getContent().trim());
        }
        return puppetClass;
    }

    private ArrayList<PuppetParam> getPuppetClassParamsFromClassHeader(PuppetClass puppetClass) {
        String header = puppetClass.getContent().lines().findFirst().orElse(null);
        ArrayList<PuppetParam> params = new ArrayList<>();
        if (header != null && header.contains("(")) {
            header = header.replace("class " + puppetClass.getName() + " (", "");
            header = header.replace(") {", "");
            if (header.isEmpty()) {
                return params;
            }
            List<String> paramsWithTypes = Arrays.stream(header.split(",")).map(String::trim).collect(Collectors.toList());
            for (String paramWithType : paramsWithTypes) {
                String[] paramAndType = paramWithType.split(" ");
                params.add(new PuppetParam(paramAndType[1], null, getParamType(paramAndType[0])));
            }
        }
        return params;
    }

    private PuppetParamType getParamType(String type) {
        try {
            return PuppetParamType.valueOf(type);
        } catch (IllegalArgumentException e) {
            return PuppetParamType.ANY;
        }
    }

    private void removePrefixFromPuppetClass(PuppetClass puppetClass) {
        int realContentBeginIndex = puppetClass.getContent().indexOf("{\n");
        String contentWithoutPrefix = puppetClass.getContent().substring(realContentBeginIndex + 2);
        puppetClass.setContent(contentWithoutPrefix);
    }

    private void removeSuffixFromPuppetClass(PuppetClass puppetClass) {
        int suffixIndex = puppetClass.getContent().lastIndexOf("}");
        String contentWithoutSuffix = puppetClass.getContent().substring(0, suffixIndex);
        puppetClass.setContent(contentWithoutSuffix);
    }

    private void addTypesToClassContentVariables(PuppetClass puppetClass) {
        for (PuppetParam param : puppetClass.getParams()) {
            String paramNameWithType = param.getName() + PARAM_TYPE_PREFIX + param.getType();
            String paramName = param.getName().replace("$", "");
            puppetClass.setContent(
                    puppetClass.getContent().replaceAll(
                            Pattern.quote("$") + "(" + paramName + "(?=\\W))", Matcher.quoteReplacement(paramNameWithType)
                    )
            );
        }
    }

    @Override
    protected void validateDtoBeforeModifyingOnAddOperation(PuppetClass puppetClass) throws PuppetValidationException {
        super.validateDtoBeforeModifyingOnAddOperation(puppetClass);
        if (puppetClass == null || puppetClass.getName() == null) {
            throw new PuppetValidationException("Brak nazwy klasy");
        }
        if (puppetClass.getContent() != null && puppetClass.getContent().contains("class " + puppetClass.getName())) {
            throw new PuppetValidationException("Niepoprawna definicja klasy: zawiera \"class " + puppetClass.getName() + '"');
        }
    }

    @Override
    protected void modifyDtoBeforeAnyOperation(PuppetClass puppetClass) {
        super.modifyDtoBeforeAnyOperation(puppetClass);
        if (puppetClass.getContent() == null) {
            puppetClass.setContent("");
        }
        puppetClass.setParams(getPuppetClassParams(puppetClass.getContent()));
        puppetClass.setContent(
                getPuppetClassContentPrefix(puppetClass) +
                getClassContentWithoutVariablesTypes(puppetClass) +
                getPuppetClassContentSuffix()
        );
        if (contentWithParamsOff(puppetClass.getContent())) {
            puppetClass.setContent(puppetClass.getContent().replace(NO_PARAMS, ""));
        }
    }

    private ArrayList<PuppetParam> getPuppetClassParams(String content) {
        if (content == null || content.isBlank() || contentWithParamsOff(content)) {
            return new ArrayList<>();
        }
        Set<PuppetParam> stringParams = getPuppetClassStringParams(content);
        return getPuppetClassParamsWithTypes(stringParams, content);
    }

    private Set<PuppetParam> getPuppetClassStringParams(String content) {
        Pattern pattern = Pattern.compile("\\$\\{([A-Z]|[a-z])\\w+}");
        Matcher matcher = pattern.matcher(content);
        Set<PuppetParam> params = new HashSet<>();
        while (matcher.find()) {
            String stringParam = matcher.group().replace("{", "").replace("}", "");
            params.add(new PuppetParam(stringParam, null, PuppetParamType.STRING));
        }
        return params;
    }

    private ArrayList<PuppetParam> getPuppetClassParamsWithTypes(Set<PuppetParam> params, String content) {
        Pattern pattern = Pattern.compile("\\$([A-Z]|[a-z])\\w+(" + PARAM_TYPE_PREFIX + "\\w+)?");
        Matcher matcher = pattern.matcher(content);
        while (matcher.find()) {
            String param = matcher.group();
            if (param.contains(PARAM_TYPE_PREFIX)) {
                String[] paramAndType = param.split(PARAM_TYPE_PREFIX);
                params.add(new PuppetParam(paramAndType[0], null, getParamType(paramAndType[1])));
            } else {
                params.add(new PuppetParam(param, null, PuppetParamType.ANY));
            }
        }
        return new ArrayList<>(params);
    }

    @Override
    protected String getLocationDir(BasePuppetFile file) {
        return "/etc/puppetlabs/code/environments/" + file.getEnvironment() + "/manifests/classes";
    }

    @Override
    protected String getFilename(PuppetClass puppetClass) {
        return puppetClass.getName() + ".pp";
    }

    private String getPuppetClassContentPrefix(PuppetClass puppetClass) {
        if (contentWithParamsOff(puppetClass.getContent())) {
            return "class " + puppetClass.getName() + " () {\n";
        }
        String paramsNames = puppetClass
                .getParams()
                .stream()
                .map(param -> param.getType() + " " + param.getName())
                .collect(Collectors.joining(", "));
        return "class " + puppetClass.getName() + " (" + paramsNames + ") {\n";
    }

    private String getClassContentWithoutVariablesTypes(PuppetClass puppetClass) {
        if (contentWithParamsOff(puppetClass.getContent())) {
            return puppetClass.getContent().trim();
        }
        return puppetClass.getContent().replaceAll("(" + PARAM_TYPE_PREFIX + "\\w+)", "").trim();
    }

    private String getPuppetClassContentSuffix() {
        return "\n}";
    }

    private boolean contentWithParamsOff(String content) {
        return content == null || content.contains(NO_PARAMS);
    }
}
