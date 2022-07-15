package com.dyplom.suppet.service.agents;

import com.dyplom.suppet.service.agents.classes.PuppetAgentsClassesService;
import com.dyplom.suppet.service.agents.model.Agent;
import com.dyplom.suppet.service.classes.PuppetClassesService;
import com.dyplom.suppet.service.classes.model.PuppetClass;
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
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class PuppetAgentsService {
    private final Logger log = LoggerFactory.getLogger("PuppetAgentsService");

    private final String defaultUser = "vagrant";
    private final String defaultPassword = "vagrant";

    private final PuppetClassesService puppetClassesService;
    private final PuppetAgentsClassesService agentsClassesService;

    @Autowired
    public PuppetAgentsService(PuppetClassesService puppetClassesService,
                               PuppetAgentsClassesService agentsClassesService) {
        this.puppetClassesService = puppetClassesService;
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

    public Agent getClasses(String agentName) {
        PuppetManifest manifest = agentsClassesService.get(new PuppetManifest(agentName));
        if (manifest == null) {
            return new Agent(agentName, new ArrayList<>());
        }
        String classesNames = manifest.getContent()
                .replace(getAgentsClassPrefix(agentName), "")
                .replace(getAgentsClassSuffix(), "");
        ArrayList<PuppetClass> puppetClasses = Arrays.stream(classesNames.split(", "))
                .map(String::trim)
                .map(puppetClass -> {
                    String puppetClassName = puppetClass;
                    String paramsValuesString = "";
                    int paramsBeginIndex = puppetClass.indexOf("(");
                    if (paramsBeginIndex > -1) {
                        puppetClassName = puppetClass.substring(0, paramsBeginIndex);
                        paramsValuesString = puppetClass.substring(paramsBeginIndex, puppetClass.indexOf(")"));
                    }
                    ArrayList<String> paramsValuesArray = paramsValuesString.isEmpty() ? new ArrayList<>() :
                            Arrays.stream(paramsValuesString.split(",")).map(String::trim)
                            .collect(Collectors.toCollection(ArrayList::new));
                    HashMap<String, String> paramsValues = new HashMap<>();
                    PuppetClass puppetClassDto = puppetClassesService.get(new PuppetClass(null, puppetClassName));
                    if (puppetClassDto == null) {
                        return new PuppetClass(null, puppetClassName);
                    }
                    for (int i = 0; i < puppetClassDto.getParams().size(); i++) {
                        paramsValues.put(puppetClassDto.getParams().get(i), paramsValuesArray.get(i));
                    }
                    puppetClassDto.setParamsValues(paramsValues);
                    return puppetClassDto;
                }).collect(Collectors.toCollection(ArrayList::new));
//        if (!puppetClasses.isEmpty() && manifest.getName().equals(puppetClasses.get(0).getName())) {
//            puppetClasses.subList(1, puppetClasses.size() - 1);
//        }
        return new Agent(agentName, puppetClasses);
    }

    public BrowserActionResult setClasses(Agent agent) {
        ArrayList<String> classes = new ArrayList<>();
        classes.add(agent.getName().substring( 0, agent.getName().lastIndexOf('.')));
        for (PuppetClass puppetClass: agent.getClasses()) {
            StringBuilder sb = new StringBuilder();
            sb.append(puppetClass.getName());
            if (!puppetClass.getParamsValues().isEmpty()) {
                sb.append("(");
                sb.append(String.join(", ", puppetClass.getParamsValues().values()));
                sb.append(")");
            }
            String newClass = sb.toString();
            if (!classes.contains(newClass)) {
                classes.add(newClass);
            }
        }
        String manifestContent = getAgentsClassPrefix(agent) + String.join(", ", classes) + getAgentsClassSuffix();
        PuppetManifest manifest = new PuppetManifest(manifestContent, agent.getName());
        return agentsClassesService.edit(manifest);
    }

    private String getAgentsClassPrefix(Agent agent) {
        return getAgentsClassPrefix(agent.getName());
    }

    private String getAgentsClassPrefix(String agentName) {
        return "node '" + agentName + "' {\n\tinclude ";
    }

    private String getAgentsClassSuffix() {
        return "\n}";
    }
}
