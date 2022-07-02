package com.dyplom.suppet.service.classes;

import com.dyplom.suppet.service.classes.model.PuppetClass;
import com.dyplom.suppet.service.common.AbstractPuppetFilesBrowserCRUDService;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidationException;
import org.springframework.stereotype.Service;

@Service
public class PuppetClassesService extends AbstractPuppetFilesBrowserCRUDService<PuppetClass> {

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
        };
    }

    @Override
    public PuppetClass get(PuppetClass puppetClass) {
        puppetClass = super.get(puppetClass);
        if (puppetClass.getContent() != null && !puppetClass.getContent().isEmpty()) {
            removePrefixFromPuppetClass(puppetClass);
            removeSuffixFromPuppetClass(puppetClass);
        }
        return puppetClass;
    }

    private void removePrefixFromPuppetClass(PuppetClass puppetClass) {
        String contentWithoutPrefix = puppetClass.getContent().replace(getPuppetClassContentPrefix(puppetClass), "");
        puppetClass.setContent(contentWithoutPrefix);
    }

    private void removeSuffixFromPuppetClass(PuppetClass puppetClass) {
        int suffixIndex = puppetClass.getContent().lastIndexOf(getPuppetClassContentSuffix());
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
    protected String getLocationDir() {
        return "/etc/puppetlabs/code/environments/production/manifests/classes";
    }

    @Override
    protected String getFilename(PuppetClass puppetClass) {
        return puppetClass.getName() + ".pp";
    }

    private String getPuppetClassContentPrefix(PuppetClass puppetClass) {
        return "class " + puppetClass.getName() + " {\n";
    }

    private String getPuppetClassContentSuffix() {
        return "\n}";
    }
}
