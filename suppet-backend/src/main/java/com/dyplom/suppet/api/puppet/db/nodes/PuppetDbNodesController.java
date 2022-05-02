package com.dyplom.suppet.api.puppet.db.nodes;

import com.dyplom.suppet.api.puppet.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppet.db.nodes.PuppetDbNodesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet/nodes")
@CrossOrigin
public class PuppetDbNodesController extends AbstractPuppetDbController<PuppetDbNodesService> {
    private final Logger logger = LoggerFactory.getLogger("PuppetNodesController");

    @Autowired
    public PuppetDbNodesController(PuppetDbNodesService service) {
        super(service);
    }
}
