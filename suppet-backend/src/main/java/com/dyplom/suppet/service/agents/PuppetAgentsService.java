package com.dyplom.suppet.service.agents;

import com.dyplom.suppet.service.agents.classes.PuppetAgentsClassesService;
import com.dyplom.suppet.service.agents.model.Agent;
import com.dyplom.suppet.service.agents.utils.PuppetAgentsClassesUtils;
import com.dyplom.suppet.service.common.BrowserActionResult;
import com.dyplom.suppet.service.common.CommandLineProcessResult;
import com.dyplom.suppet.service.common.CommandLineUtils;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class PuppetAgentsService {
    private final Logger log = LoggerFactory.getLogger("PuppetAgentsService");

    private final String defaultUser = "vagrant";
    private final String defaultPassword = "vagrant";

    private final PuppetAgentsClassesService agentsClassesService;

    @Autowired
    public PuppetAgentsService(PuppetAgentsClassesService agentsClassesService) {
        this.agentsClassesService = agentsClassesService;
    }

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
        CommandLineProcessResult result = CommandLineUtils.getDataFromProcess(p);
        if (result.getResult() != 0 && result.getData().contains("Applied catalog in")) {
            return new BrowserActionResult(0);
        }
        return new BrowserActionResult(result);
    }

    public Agent getAgentWithClasses(String agentName) {
        PuppetManifest manifest = agentsClassesService.get(new PuppetManifest(agentName));
        if (manifest == null) {
            return new Agent(agentName, new ArrayList<>());
        }
        return new Agent(agentName, PuppetAgentsClassesUtils.getClassesFromAgentsManifest(manifest));
    }

    public BrowserActionResult setAgentsClassesManifest(Agent agent) {
        PuppetManifest agentsManifest = PuppetAgentsClassesUtils.getClassManifestForAgent(agent);
        return agentsClassesService.edit(agentsManifest);
    }
}
