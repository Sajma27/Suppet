package com.dyplom.suppet.service.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CommandLineUtils {
    private static final Logger log = LoggerFactory.getLogger("CommandLineUtils");

    public static Process getProcess(ArrayList<String> command) throws IOException {
        String[] commandArray = {};
        commandArray = command.toArray(commandArray);
        return Runtime.getRuntime().exec(commandArray);
    }

    public static StringBuilder getDataFromProcess(Process p) throws IOException, InterruptedException {
        return getDataFromProcess(p, false);
    }

    public static StringBuilder getDataFromProcess(Process p, boolean includeErrors) throws IOException, InterruptedException {
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        StringBuilder builder = new StringBuilder();
        String line;
        while (p.isAlive()) {
            while ((line = inputStream.readLine()) != null) {
                builder.append(line);
            }
            while ((line = errorStream.readLine()) != null) {
                if (includeErrors) {
                    builder.append(line);
                } else {
                    log.error(line);
                }
            }
        }

        log.info(String.valueOf(p.waitFor()));
        p.destroy();
        return builder;
    }

    public static int getResultFromProcess(Process p) throws InterruptedException {
        int result = p.waitFor();
        log.info(String.valueOf(result));
        p.destroy();
        return result;
    }

    public static JsonNode getJsonNodeFromData(StringBuilder data) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(data.toString());
    }

    public static ArrayList<String> getSudoPuppetCommand(List<String> params) {
        ArrayList<String> command =  new ArrayList<>(Arrays.asList("sudo", "/opt/puppetlabs/bin/puppet"));
        command.addAll(params);
        return command;
    }

    public static ArrayList<String> getSudoPuppetserverCommand(List<String> params) {
        ArrayList<String> command =  new ArrayList<>(Arrays.asList("sudo", "/opt/puppetlabs/bin/puppetserver"));
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

        Path path = Paths.get(filePath);
        String writtenContent = Files.readString(path);
        return writtenContent != null && writtenContent.equals(content);
    }

    public static void deleteFile(String filePath) throws IOException {
        if (filePath != null) {
            Path path = Paths.get(filePath);
            Files.delete(path);
        }
    }

}
