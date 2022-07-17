package com.dyplom.suppet.service.classes;

import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.classes.model.PuppetParam;
import com.dyplom.suppet.service.classes.model.enums.PuppetParamType;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidationException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class PuppetClassesService extends AbstractPuppetFilesBrowserCRUDService<PuppetClass> {

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
        }
        return puppetClass;
    }

    private ArrayList<PuppetParam> getPuppetClassParamsFromClassHeader(PuppetClass puppetClass) {
        String header = puppetClass.getContent().lines().findFirst().orElse(null);
        ArrayList<PuppetParam> params = new ArrayList<>();
        if (header != null && header.contains("(")) {
            header = header.replace("class " + puppetClass.getName() + " (", "");
            header = header.replace(") {", "");
            List<String> paramsWithTypes = Arrays.stream(header.split(",")).map(String::trim).collect(Collectors.toList());
            for (String paramWithType: paramsWithTypes) {
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
            return PuppetParamType.STRING;
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
        puppetClass.setContent(getPuppetClassContentPrefix(puppetClass) + puppetClass.getContent() + getPuppetClassContentSuffix());
    }

    @Override
    protected void modifyDtoBeforeAddOperation(PuppetClass puppetClass) {
        super.modifyDtoBeforeAddOperation(puppetClass);
        puppetClass.setParams(getPuppetClassParams(puppetClass.getContent()));
    }

    private ArrayList<PuppetParam> getPuppetClassParams(String content) {
        if (content == null) {
            return new ArrayList<>();
        }
        ArrayList<PuppetParam> params = getPuppetClassStringParams(content);
        params.addAll(getPuppetClassParamsWithTypes(content));
        return params;
    }

    private ArrayList<PuppetParam> getPuppetClassStringParams(String content) {
        Pattern pattern = Pattern.compile("\\$\\{([A-Z]|[a-z])\\w+}");
        Matcher matcher = pattern.matcher(content);
        Set<PuppetParam> params = new HashSet<>();
        while (matcher.find()) {
            params.add(new PuppetParam(matcher.group(), null, PuppetParamType.STRING));
        }
        return new ArrayList<>(params);
    }

    private ArrayList<PuppetParam> getPuppetClassParamsWithTypes(String content) {
        Pattern pattern = Pattern.compile("\\$([A-Z]|[a-z])\\w+(::\\w+)?");
        Matcher matcher = pattern.matcher(content);
        Set<PuppetParam> params = new HashSet<>();
        while (matcher.find()) {
            String param = matcher.group();
            if (param.contains("::")) {
                String[] paramAndType = param.split("::");
                params.add(new PuppetParam(paramAndType[0], null, getParamType(paramAndType[1])));
            } else {
                params.add(new PuppetParam(param, null, PuppetParamType.STRING));
            }
        }
        return new ArrayList<>(params);
    }

    @Override
    protected String getLocationDir() {
        return "/etc/puppetlabs/code/environments/production/manifests/classes";
    }

    @Override
    protected String getFilename(PuppetClass puppetClass) {
        return puppetClass.getName() + ".pp";
    }

    private String getPuppetClassContentPrefix(PuppetClass puppetClass) {
        String paramsNames = puppetClass.getParams().stream().map(PuppetParam::getName).collect(Collectors.joining(", "));
        return "class " + puppetClass.getName() + " (" + paramsNames + ") {\n";
    }

    private String getPuppetClassContentSuffix() {
        return "\n}";
    }
}
