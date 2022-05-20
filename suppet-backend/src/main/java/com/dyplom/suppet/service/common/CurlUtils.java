package com.dyplom.suppet.service.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class CurlUtils {
    private static final Logger log = LoggerFactory.getLogger("CurlUtils");

    public static Process getProcess(ArrayList<String> command) throws IOException {
        String[] commandArray = {};
        commandArray = command.toArray(commandArray);
        return Runtime.getRuntime().exec(commandArray);
    }

    public static StringBuilder getDataFromProcess(Process p) throws IOException, InterruptedException {
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        StringBuilder builder = new StringBuilder();
        String line;
        while (p.isAlive()) {
            while ((line = inputStream.readLine()) != null) {
                builder.append(line);
            }
            while ((line = errorStream.readLine()) != null) {
                log.error(line);
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

}
