package com.dyplom.suppet.service.common;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidationException;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FilenameFilter;
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
        FilenameFilter filenameFilter = (dir, name) -> name != null && name.endsWith(".pp");
        String[] filenames = Objects.requireNonNull(filesDir.list(filenameFilter));
        List<BasePuppetFile> files = Arrays.stream(filenames).map(BasePuppetFile::new).collect(Collectors.toList());
        return new ObjectMapper().valueToTree(files);
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
            modifyAndValidateDtoBeforeAddOperation(dto);
            boolean classEdited = CommandLineUtils.writeContentToFile(dto.getContent(), getFilePath(dto));
            return new BrowserActionResult(classEdited);
        } catch (IOException e) {
            return getBrowserActionResult(e);
        } catch (PuppetValidationException e) {
            return getBrowserActionResult(e);
        }
    }

    @Override
    public BrowserActionResult edit(DTO dto) {
        try {
            modifyAndValidateDtoBeforeEditOperation(dto);
            boolean classEdited = CommandLineUtils.writeContentToFile(dto.getContent(), getFilePath(dto));
            return new BrowserActionResult(classEdited);
        } catch (IOException e) {
            return getBrowserActionResult(e);
        } catch (PuppetValidationException e) {
            return getBrowserActionResult(e);
        }
    }

    @Override
    public BrowserActionResult delete(DTO dto) {
        try {
            CommandLineUtils.deleteFile(getFilePath(dto));
            return new BrowserActionResult(0);
        } catch (IOException e) {
            return getBrowserActionResult(e);
        }
    }

    @Override
    public BrowserActionResult validateAdd(DTO dto) {
        try {
            modifyAndValidateDtoBeforeAddOperation(dto);
        } catch (PuppetValidationException e) {
            return getBrowserActionResult(e);
        } catch (IOException e) {
            return getBrowserActionResult(e);
        }
        return super.validateAdd(dto);
    }

    private void modifyAndValidateDtoBeforeAddOperation(DTO dto) throws PuppetValidationException, IOException {
        validateDtoBeforeModifyingOnAddOperation(dto);
        modifyDtoBeforeAddOperation(dto);
        PuppetValidator.validatePuppetFile(dto);
    }

    @Override
    public BrowserActionResult validateEdit(DTO dto) {
        try {
            modifyAndValidateDtoBeforeEditOperation(dto);
        } catch (PuppetValidationException e) {
            return getBrowserActionResult(e);
        } catch (IOException e) {
            return getBrowserActionResult(e);
        }
        return super.validateEdit(dto);
    }

    private void modifyAndValidateDtoBeforeEditOperation(DTO dto) throws PuppetValidationException, IOException {
        validateDtoBeforeModifyingOnEditOperation(dto);
        modifyDtoBeforeEditOperation(dto);
        PuppetValidator.validatePuppetFile(dto);
    }

    protected String getFilePath(DTO dto) {
        return getLocationDir() + "/" + getFilename(dto);
    }

    protected abstract String getLocationDir();

    protected abstract String getFilename(DTO dto);

    protected void validateDtoBeforeModifyingOnAnyOperation(DTO dto) throws PuppetValidationException {
    }

    protected void validateDtoBeforeModifyingOnAddOperation(DTO dto) throws PuppetValidationException {
        validateDtoBeforeModifyingOnAnyOperation(dto);
    }

    protected void validateDtoBeforeModifyingOnEditOperation(DTO dto) throws PuppetValidationException {
        validateDtoBeforeModifyingOnAnyOperation(dto);
    }

    protected void modifyDtoBeforeAnyOperation(DTO dto) {
    }

    protected void modifyDtoBeforeAddOperation(DTO dto) {
        modifyDtoBeforeAnyOperation(dto);
    }

    protected void modifyDtoBeforeEditOperation(DTO dto) {
        modifyDtoBeforeAnyOperation(dto);
    }

    private BrowserActionResult getBrowserActionResult(IOException e) {
        e.printStackTrace();
        return new BrowserActionResult(-1, e.getMessage());
    }

    private BrowserActionResult getBrowserActionResult(PuppetValidationException e) {
        return new BrowserActionResult(-2, e.getMessage());
    }
}