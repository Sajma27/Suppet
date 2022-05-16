package com.dyplom.suppet.api.db.facts;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.facts.PuppetDbFactNamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/fact-names")
@CrossOrigin
public class PuppetDbFactNamesController extends AbstractPuppetDbController<PuppetDbFactNamesService> {

    @Autowired
    public PuppetDbFactNamesController(PuppetDbFactNamesService service) {
        super(service);
    }

}
