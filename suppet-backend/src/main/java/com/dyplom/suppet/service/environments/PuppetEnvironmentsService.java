package com.dyplom.suppet.service.environments;

import com.dyplom.suppet.service.common.*;
import com.dyplom.suppet.service.environments.model.PuppetEnvironment;
import org.springframework.stereotype.Service;

import java.io.FilenameFilter;
import java.io.IOException;

@Service
public class PuppetEnvironmentsService extends AbstractPuppetFilesBrowserCRUDService<PuppetEnvironment> {

    @Override
    protected FilenameFilter getFilenameFilter() {
        return (dir, name) -> name != null && dir.isDirectory();
    }

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
        };
    }

    @Override
    protected String getLocationDir(BasePuppetFile file) {
        return "/etc/puppetlabs/code/environments";
    }

    @Override
    protected String getFilename(PuppetEnvironment puppetEnvironment) {
        return puppetEnvironment.getName();
    }

    @Override
    public BrowserActionResult add(PuppetEnvironment dto) {
        try {
            boolean added = createEmptyEnv(dto);
            if (!added) {
                delete(dto);
            }
            return new BrowserActionResult(added);
        } catch (IOException e) {
            delete(dto);
            return getBrowserActionResult(e);
        }
    }

    private boolean createEmptyEnv(PuppetEnvironment dto) throws IOException {
        String envDirPath = getFilePath(dto);
        String envManifestsDirPath = envDirPath + "/manifests";
        String[] dirsToBeCreated = new String[]{
                envDirPath,
                envDirPath + "/modules",
                envManifestsDirPath,
                envManifestsDirPath + "/classes",
                envManifestsDirPath + "/agents",
                envManifestsDirPath + "/agents/classes"
        };
        for (String dirPath: dirsToBeCreated) {
            boolean created = CommandLineUtils.createDirectory(dirPath);
            if (!created) {
                return false;
            }
        }
        return CommandLineUtils.writeContentToFile("node default {}", envManifestsDirPath + "/default.pp");
    }

    @Override
    public BrowserActionResult edit(PuppetEnvironment puppetEnvironment) {
        return new BrowserActionResult(-1);
    }

    public BrowserActionResult copy(String sourceEnvName, String newEnvName) {
        try {
            String sourceFilePath = getFilePath(new PuppetEnvironment(sourceEnvName));
            String newEnvFilePath = getFilePath(new PuppetEnvironment(newEnvName));
            boolean copied = CommandLineUtils.copyDirectory(sourceFilePath, newEnvFilePath);
            if (!copied) {
                delete(new PuppetEnvironment(newEnvName));
            }
            return new BrowserActionResult(copied);
        } catch (IOException e) {
            delete(new PuppetEnvironment(newEnvName));
            return getBrowserActionResult(e);
        }
    }

    @Override
    public BrowserActionResult delete(PuppetEnvironment dto) {
        try {
            CommandLineUtils.deleteDirectory(getFilePath(dto));
            return new BrowserActionResult(0);
        } catch (IOException e) {
            return getBrowserActionResult(e);
        }
    }
}
