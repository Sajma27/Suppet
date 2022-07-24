package com.dyplom.suppet.service.modules;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.common.*;
import com.dyplom.suppet.service.modules.model.PuppetModule;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class PuppetModulesService extends AbstractPuppetFilesBrowserCRUDService<PuppetModule> {

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
                new UniversalBrowserHeader("version", "Wersja"),
        };
    }

    @Override
    public JsonNode fetchData(UniversalBrowserParams params, String additionalUrl) throws IOException, InterruptedException {
        ArrayList<String> command = getFetchDataCommand(params, additionalUrl);
        Process p = CommandLineUtils.getProcess(command);
        CommandLineProcessResult result = CommandLineUtils.getDataFromProcess(p);
        convertResultToJson(params, result);
        if (result.getData().contains("no modules installed")) {
            result.setData("[]");
        }
        return CommandLineUtils.getJsonNodeFromData(result.getData());
    }

    private void convertResultToJson(UniversalBrowserParams params, CommandLineProcessResult result) {
        if (result.getData() == null || result.getData().isEmpty()) {
            result.setData("[]");
            return;
        }
        result.setData(result.getData()
                .replace(getLocationDir(params), "")
                .replace("├── ", "{\"name\": \"")
                .replace("└──", "{\"name\": \"")
                .replace(" (\u001B[0;36mv", "\", \"version\": \"")
                .replace("\u001B[0m)", "\"},"));
        result.setData('[' + result.getData().substring(0, result.getData().length() - 1)  + ']');
    }

    @Override
    protected ArrayList<String> getFetchDataCommand(UniversalBrowserParams params, String additionalUrl) {
        return CommandLineUtils.getSudoPuppetCommand(Arrays.asList("module", "list", "--modulepath", getLocationDir(params)));
    }

    @Override
    public PuppetModule get(PuppetModule dto) {
        return null;
    }

    @Override
    public BrowserActionResult add(PuppetModule dto) {
        ArrayList<String> command = CommandLineUtils.getSudoPuppetCommand(Arrays.asList("module", "install", "--environment", dto.getEnvironment(), dto.getName().trim()));
        addVersionToCommand(dto, command);
        return runCommand(command);
    }

    @Override
    public BrowserActionResult edit(PuppetModule module) {
        return new BrowserActionResult(-2, "Metoda niezaimplementowana");
    }

    public BrowserActionResult upgradeToNewest(PuppetModule dto) {
        dto.setVersion(null);
        return upgrade(dto);
    }

    public BrowserActionResult upgrade(PuppetModule dto) {
        ArrayList<String> commandParts = new ArrayList<>(Arrays.asList("module", "upgrade", "--environment", dto.getEnvironment(), dto.getName().trim()));
        addVersionToCommand(dto, commandParts);
        ArrayList<String> command = CommandLineUtils.getSudoPuppetCommand(commandParts);
        return runCommand(command);
    }

    private void addVersionToCommand(PuppetModule dto, ArrayList<String> commandParts) {
        if (dto.getVersion() != null) {
            commandParts.add("--version");
            commandParts.add(dto.getVersion());
        }
    }

    @Override
    public BrowserActionResult delete(PuppetModule dto) {
        ArrayList<String> command = CommandLineUtils.getSudoPuppetCommand(Arrays.asList("module", "uninstall", "--environment", dto.getEnvironment(), dto.getName().trim()));
        return runCommand(command);
    }

    private BrowserActionResult runCommand(ArrayList<String> command) {
        try {
            Process p = CommandLineUtils.getProcess(command);
            CommandLineProcessResult result = CommandLineUtils.getDataFromProcess(p);
            return new BrowserActionResult(result);
        } catch (IOException | InterruptedException e) {
            return new BrowserActionResult(-1, e.getMessage());
        }
    }

    @Override
    protected String getLocationDir(BasePuppetFile file) {
        return "/etc/puppetlabs/code/environments/" + file.getEnvironment() + "/modules";
    }

    @Override
    protected String getFilename(PuppetModule module) {
        return null;
    }
}
