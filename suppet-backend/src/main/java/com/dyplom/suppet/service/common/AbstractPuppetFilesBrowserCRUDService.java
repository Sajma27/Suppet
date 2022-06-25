package com.dyplom.suppet.service.common;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.puppet.validator.PuppetValidationException;
import com.dyplom.suppet.service.puppet.validator.PuppetValidator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public abstract class AbstractPuppetFilesBrowserCRUDService<DTO extends BasePuppetFile> extends AbstractBrowserCRUDService<DTO> {

    @Override
    public JsonNode fetchData(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        File filesDir = new File(getLocationDir());
        List<BasePuppetFile> files = Arrays.stream(Objects.requireNonNull(filesDir.list())).map(BasePuppetFile::new).collect(Collectors.toList());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.valueToTree(files);
    }

    @Override
    protected ArrayList<String> getFetchDataCommand(UniversalBrowserParams params, String additionalUrl) {
        return null;
    }

    @Override
    public DTO get(DTO dto) {
        try {
            Path classPath = Paths.get(getFilePath(dto));
            String content = Files.readString(classPath);
            dto.setContent(content);
            return dto;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public BrowserActionResult add(DTO dto) {
        try {
            PuppetValidator.validatePuppetFile(dto);
            boolean classEdited = CommandLineUtils.writeContentToFile(dto.getContent(), getFilePath(dto));
            return new BrowserActionResult(classEdited);
        } catch (IOException e) {
            e.printStackTrace();
            return new BrowserActionResult(-1, "Cannot add file: " + dto.getName() + " with provided content");
        } catch (PuppetValidationException e) {
            return new BrowserActionResult(-2, e.getMessage());
        }
    }

    @Override
    public BrowserActionResult edit(DTO dto) {
        try {
            PuppetValidator.validatePuppetFile(dto);
            boolean classEdited = CommandLineUtils.writeContentToFile(dto.getContent(), getFilePath(dto));
            return new BrowserActionResult(classEdited);
        } catch (IOException e) {
            e.printStackTrace();
            return new BrowserActionResult(-1, "Cannot edit file: " + dto.getName() + " with provided content");
        } catch (PuppetValidationException e) {
            return new BrowserActionResult(-2, e.getMessage());
        }
    }

    @Override
    public BrowserActionResult delete(DTO dto) {
        try {
            CommandLineUtils.deleteFile(getFilePath(dto));
            return new BrowserActionResult(0);
        } catch (IOException e) {
            e.printStackTrace();
            return new BrowserActionResult(-1, "Cannot delete file: " + dto.getName());
        }
    }

    protected String getFilePath(DTO dto) {
        return getLocationDir() + "/" + getFilename(dto);
    }

    protected abstract String getLocationDir();

    protected abstract String getFilename(DTO dto);
}
