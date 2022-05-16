package com.dyplom.suppet.api.db.facts;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.facts.PuppetDbFactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/facts")
@CrossOrigin
public class PuppetDbFactsController extends AbstractPuppetDbController<PuppetDbFactsService> {

    @Autowired
    public PuppetDbFactsController(PuppetDbFactsService service) {
        super(service);
    }

}
