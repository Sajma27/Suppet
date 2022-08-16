package com.dyplom.suppet.api.agents;

import com.dyplom.suppet.service.agents.PuppetAgentsService;
import com.dyplom.suppet.service.agents.model.Agent;
import com.dyplom.suppet.service.common.BrowserActionResult;
import com.dyplom.suppet.service.common.validator.PuppetValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/puppet/agents")
@CrossOrigin
public class PuppetAgentsController {
    private final Logger logger = LoggerFactory.getLogger("PuppetAgentsController");
    private final PuppetAgentsService agentsService;

    @Autowired
    public PuppetAgentsController(PuppetAgentsService agentsService) {
        this.agentsService = agentsService;
    }

    @RequestMapping(value = "/updateAgent", method = RequestMethod.GET)
    public BrowserActionResult updateAgent(@RequestParam String agent) throws IOException, InterruptedException {
        logger.info("Updating agent: " + agent);
        return this.agentsService.updateAgent(agent);
    }

    @RequestMapping(value = "/addToHostsAndUpdateAgent", method = RequestMethod.GET)
    public BrowserActionResult addToHostsAndUpdateAgent(@RequestParam String ip, @RequestParam String agent) throws IOException, InterruptedException {
        return this.agentsService.addToHostsAndUpdateAgent(ip, agent);
    }

    @RequestMapping(value = "/changeAgentsEnvironment", method = RequestMethod.GET)
    public BrowserActionResult changeAgentsEnvironment(@RequestParam String agent, @RequestParam String environment) throws IOException, InterruptedException {
        logger.info("Changing agent's " + agent + " environment to " + environment);
        return this.agentsService.changeAgentsEnvironment(agent, environment);
    }

    @RequestMapping(value = "/setAgentsConfig", method = RequestMethod.POST)
    public BrowserActionResult setAgentsConfig(@RequestBody Agent agent) throws IOException, InterruptedException {
        return this.agentsService.setAgentsConfig(agent);
    }

    @RequestMapping(value = "/getAgentWithConfig", method = RequestMethod.GET)
    public Agent getAgentWithConfig(@RequestParam String agent) throws IOException, InterruptedException {
        return this.agentsService.getAgentWithConfig(agent);
    }

    @RequestMapping(value = "/getAgentWithClasses", method = RequestMethod.GET)
    public Agent getAgentWithClasses(@RequestParam String agent, @RequestParam String environment) {
        return this.agentsService.getAgentWithClasses(agent, environment);
    }

    @RequestMapping(value = "/updateAgentsClassesManifest", method = RequestMethod.POST)
    public BrowserActionResult updateAgentsClassesManifest(@RequestBody Agent agent) throws PuppetValidationException {
        return this.agentsService.setAgentsClassesManifest(agent);
    }
}
