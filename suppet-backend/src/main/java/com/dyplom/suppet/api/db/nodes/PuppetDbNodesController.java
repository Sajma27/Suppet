package com.dyplom.suppet.api.db.nodes;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.nodes.PuppetDbNodesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/nodes")
@CrossOrigin
public class PuppetDbNodesController extends AbstractPuppetDbController<PuppetDbNodesService> {

    @Autowired
    public PuppetDbNodesController(PuppetDbNodesService service) {
        super(service);
    }

}
