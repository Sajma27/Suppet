package com.dyplom.suppet.service.classes;

import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
            removePrefixFromPuppetClass(puppetClass);
            removeSuffixFromPuppetClass(puppetClass);
        }
        setPuppetClassParams(puppetClass);
        return puppetClass;
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
        setPuppetClassParams(puppetClass);
        puppetClass.setContent(getPuppetClassContentPrefix(puppetClass) + puppetClass.getContent() + getPuppetClassContentSuffix());
    }

    private void setPuppetClassParams(PuppetClass puppetClass) {
        Pattern pattern = Pattern.compile("\\$([A-Z]|[a-z])\\w+");
        Matcher matcher = pattern.matcher(puppetClass.getContent());
        Set<String> params = new HashSet<>();
        while (matcher.find()) {
            params.add(matcher.group());
        }
        puppetClass.setParams(new ArrayList<>(params));
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
        return "class " + puppetClass.getName() + " (" + String.join(", ", puppetClass.getParams()) + ") {\n";
    }

    private String getPuppetClassContentSuffix() {
        return "\n}";
    }
}
