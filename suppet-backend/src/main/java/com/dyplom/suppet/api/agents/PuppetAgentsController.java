package com.dyplom.suppet.api.agents;

import com.dyplom.suppet.service.agents.PuppetAgentsService;
import com.dyplom.suppet.service.common.BrowserActionResult;
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
}
