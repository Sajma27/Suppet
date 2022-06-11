package com.dyplom.suppet.service.modules;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.common.*;
import com.dyplom.suppet.service.modules.model.PuppetModule;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        return CommandLineUtils.getJsonNodeFromData(result.getData());
    }

    @Override
    protected ArrayList<String> getFetchDataCommand(UniversalBrowserParams params, String additionalUrl) {
        return CommandLineUtils.getSudoPuppetCommand(Arrays.asList("module", "list", "--render-as", "JSON"));
    }

    @Override
    public PuppetModule get(PuppetModule dto) {
        return null;
    }

    @Override
    public BrowserActionResult add(PuppetModule dto) {
        ArrayList<String> command = CommandLineUtils.getSudoPuppetCommand(Arrays.asList("module", "list", "--render-as", "JSON"));
        return runCommand(command);
    }

    @Override
    public BrowserActionResult edit(PuppetModule module) {
        return new BrowserActionResult(-2, "Metoda niezaimplementowana");
    }

    public BrowserActionResult upgrade(PuppetModule dto, String newVersion) {
        List<String> commandParts = Arrays.asList("module", "upgrade", dto.getName());
        if (newVersion != null) {
            commandParts.add("--version");
            commandParts.add(newVersion);
        }
        ArrayList<String> command = CommandLineUtils.getSudoPuppetCommand(commandParts);
        return runCommand(command);
    }

    @Override
    public BrowserActionResult delete(PuppetModule dto) {
        ArrayList<String> command = CommandLineUtils.getSudoPuppetCommand(Arrays.asList("module", "uninstall", dto.getName()));
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
    protected String getLocationDir() {
        return null;
    }

    @Override
    protected String getFilename(PuppetModule module) {
        return null;
    }
}
