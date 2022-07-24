package com.dyplom.suppet.service.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

public class CommandLineUtils {
    private static final Logger log = LoggerFactory.getLogger("CommandLineUtils");

    public static Process getProcess(ArrayList<String> command) throws IOException {
        String[] commandArray = {};
        commandArray = command.toArray(commandArray);
        return Runtime.getRuntime().exec(commandArray);
    }

    public static CommandLineProcessResult getDataFromProcess(Process p) throws IOException, InterruptedException {
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        StringBuilder dataBuilder = new StringBuilder();
        StringBuilder errorBuilder = new StringBuilder();
        String line;
        while (p.isAlive()) {
            while ((line = inputStream.readLine()) != null) {
                dataBuilder.append(line);
            }
            while ((line = errorStream.readLine()) != null) {
                errorBuilder.append(line);
            }
        }

        int result = p.waitFor();
        p.destroy();
        return new CommandLineProcessResult(result, dataBuilder.toString(), errorBuilder.toString());
    }

    public static JsonNode getJsonNodeFromData(String data) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(data);
    }

    public static ArrayList<String> getSudoPuppetCommand(List<String> params) {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("sudo", "/opt/puppetlabs/bin/puppet"));
        command.addAll(params);
        return command;
    }

    public static ArrayList<String> getSudoPuppetserverCommand(List<String> params) {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("sudo", "/opt/puppetlabs/bin/puppetserver"));
        command.addAll(params);
        return command;
    }

    public static boolean writeContentToFile(String content, String filePath) throws IOException {
        if (content == null || filePath == null) {
            return false;
        }
        FileWriter writer = new FileWriter(filePath, false);
        writer.write(content);
        writer.close();

        Path path = set777Permisions(filePath);

        String writtenContent = Files.readString(path);
        return writtenContent != null && writtenContent.equals(content);
    }

    public static boolean createDirectory(String dirPath) throws IOException {
        if (dirPath == null) {
            return false;
        }
        File newDir = new File(dirPath);
        boolean dirCreated = newDir.mkdir();
        if (!dirCreated) {
            return false;
        }
        set777Permisions(dirPath);
        return true;
    }

    public static boolean copyDirectory(String toBeCopiedDirPath, String newDirPath) throws IOException {
        if (newDirPath == null || toBeCopiedDirPath == null) {
            return false;
        }
        File sourceDirectory = new File(toBeCopiedDirPath);
        File destinationDirectory = new File(newDirPath);
        FileUtils.copyDirectory(sourceDirectory, destinationDirectory);
        set777Permisions(newDirPath);
        return true;
    }

    private static Path set777Permisions(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rwxrwxrwx");
        Files.setPosixFilePermissions(path, perms);
        return path;
    }

    public static void deleteFile(String filePath) throws IOException {
        if (filePath != null) {
            Path path = Paths.get(filePath);
            Files.delete(path);
        }
    }

    public static void deleteDirectory(String filePath) throws IOException {
        if (filePath != null) {
            File directory = new File(filePath);
            FileUtils.deleteQuietly(directory);
        }
    }

}
