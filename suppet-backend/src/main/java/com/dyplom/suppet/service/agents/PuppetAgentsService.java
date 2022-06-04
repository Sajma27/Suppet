package com.dyplom.suppet.service.agents;

import com.dyplom.suppet.service.common.BrowserActionResult;
import com.dyplom.suppet.service.common.CommandLineUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class PuppetAgentsService {
    private final Logger log = LoggerFactory.getLogger("PuppetAgentsService");

    private final String defaultUser = "vagrant";
    private final String defaultPassword = "vagrant";

    public BrowserActionResult updateAgent(String agent) throws IOException, InterruptedException {
        if (agent.endsWith(".home")) {
            agent = agent.substring(0, agent.length() - 5);
        }
        ArrayList<String> command = new ArrayList<>(Arrays.asList("bolt", "command", "run", "sudo /opt/puppetlabs/bin/puppet agent -t",
                "--targets", agent,
                "--user", defaultUser,
                "--password", defaultPassword,
                "--no-host-key-check"));
        Process p = CommandLineUtils.getProcess(command);
        return new BrowserActionResult(CommandLineUtils.getDataFromProcess(p));
    }

}
