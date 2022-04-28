package com.dyplom.suppet.service.puppet.agents;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class PuppetAgentsService {
    private final Logger log = LoggerFactory.getLogger("PuppetAgentsService");

    private final String defaultUser = "vagrant";
    private final String defaultPassword = "vagrant";

    public void updateAgent(String agent, String username, String password) throws IOException, InterruptedException {
        if (username == null) {
            username = defaultUser;
        }
        if (password == null) {
            password = defaultPassword;
        }
        String[] command = new String[] {"bolt", "command", "run", "sudo /opt/puppetlabs/bin/puppet agent -t",
                "--targets", agent,
                "--user", username,
                "--password", password,
                "--no-host-key-check"};
        Process p = Runtime.getRuntime().exec(command);

        BufferedReader inputStream = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        String line;
        while (p.isAlive()) {
            while ((line = inputStream.readLine()) != null) {
                log.info(line);
            }
            while ((line = errorStream.readLine()) != null) {
                log.error(line);
            }
        }

        log.info(String.valueOf(p.waitFor()));
        p.destroy();
    }

}
