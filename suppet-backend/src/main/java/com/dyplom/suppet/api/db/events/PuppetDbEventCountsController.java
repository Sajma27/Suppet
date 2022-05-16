package com.dyplom.suppet.api.db.events;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.events.PuppetDbEventCountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/event-counts")
@CrossOrigin
public class PuppetDbEventCountsController extends AbstractPuppetDbController<PuppetDbEventCountsService> {

    @Autowired
    public PuppetDbEventCountsController(PuppetDbEventCountsService service) {
        super(service);
    }

}
