package com.dyplom.suppet.api.db.events;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.events.PuppetDbEventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/events")
@CrossOrigin
public class PuppetDbEventsController extends AbstractPuppetDbController<PuppetDbEventsService> {

    @Autowired
    public PuppetDbEventsController(PuppetDbEventsService service) {
        super(service);
    }

}
