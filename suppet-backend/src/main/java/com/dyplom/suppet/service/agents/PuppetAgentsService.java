package com.dyplom.suppet.service.agents;

import com.dyplom.suppet.service.agents.classes.PuppetAgentsClassesService;
import com.dyplom.suppet.service.agents.model.Agent;
import com.dyplom.suppet.service.agents.utils.PuppetAgentsClassesUtils;
import com.dyplom.suppet.service.common.BrowserActionResult;
import com.dyplom.suppet.service.common.CommandLineProcessResult;
import com.dyplom.suppet.service.common.CommandLineUtils;
import com.dyplom.suppet.service.manifests.model.PuppetManifest;
import com.dyplom.suppet.service.puppetdb.validator.PuppetValidationException;
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
    private static final String PUPPET_MASTER = "puppet-master.home";
    private static final String PUPPET_DB = "puppet-db.home";

    private final String defaultUser = "vagrant";
    private final String defaultPassword = "vagrant";

    private final PuppetAgentsClassesService agentsClassesService;

    @Autowired
    public PuppetAgentsService(PuppetAgentsClassesService agentsClassesService) {
        this.agentsClassesService = agentsClassesService;
    }

    public BrowserActionResult updateAgent(String agent) throws IOException, InterruptedException {
        agent = getAgentWithoutDomain(agent);
        CommandLineProcessResult result = runCommandWithBolt(agent, "sudo /opt/puppetlabs/bin/puppet agent -t");
        if (result.getResult() != 0 && result.getData().contains("Applied catalog in")) {
            return new BrowserActionResult(0);
        }
        return new BrowserActionResult(result);
    }

    public BrowserActionResult changeAgentsEnvironment(String agent, String environment) throws IOException, InterruptedException {
        agent = getAgentWithoutDomain(agent);
        String commandToRun = "echo 'environment = " + environment + "' | sudo tee /etc/puppetlabs/puppet/puppet.conf";
        CommandLineProcessResult result = runCommandWithBolt(agent, commandToRun);
        if (result.getResult() != 0) {
            return new BrowserActionResult(result);
        }
        return this.updateAgent(agent);
    }

    private CommandLineProcessResult runCommandWithBolt(String agent, String commandToRun) throws IOException, InterruptedException {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("bolt", "command", "run", commandToRun,
                "--targets", agent,
                "--user", defaultUser,
                "--password", defaultPassword,
                "--no-host-key-check"));
        Process p = CommandLineUtils.getProcess(command);
        return CommandLineUtils.getDataFromProcess(p);
    }

    private String getAgentWithoutDomain(String agent) {
        return agent.endsWith(".home") ? agent.substring(0, agent.length() - 5) : agent;
    }


    public Agent getAgentWithClasses(String agentName, String environment) {
        PuppetManifest manifest = agentsClassesService.get(new PuppetManifest(null, agentName, environment));
        if (manifest == null) {
            return new Agent(agentName, new ArrayList<>(), environment);
        }
        return new Agent(agentName, PuppetAgentsClassesUtils.getClassesFromAgentsManifest(manifest), environment);
    }

    public BrowserActionResult setAgentsClassesManifest(Agent agent) throws PuppetValidationException {
        if (agent == null || PUPPET_MASTER.equals(agent.getName()) || PUPPET_DB.equals(agent.getName())) {
            throw new PuppetValidationException("Edycja wybranego agenta jest niemożliwa");
        }
        PuppetManifest agentsManifest = PuppetAgentsClassesUtils.getClassManifestForAgent(agent);
        return agentsClassesService.edit(agentsManifest);
    }
}
