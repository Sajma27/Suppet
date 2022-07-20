package com.dyplom.suppet.api.db.environment;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.environment.PuppetDbEnvironmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/environment")
@CrossOrigin
public class PuppetDbEnvironmentController extends AbstractPuppetDbController<PuppetDbEnvironmentService> {

    @Autowired
    public PuppetDbEnvironmentController(PuppetDbEnvironmentService service) {
        super(service);
    }

}
