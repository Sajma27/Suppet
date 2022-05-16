package com.dyplom.suppet.api.db.status;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.status.PuppetDbStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/status")
@CrossOrigin
public class PuppetDbStatusController extends AbstractPuppetDbController<PuppetDbStatusService> {

    @Autowired
    public PuppetDbStatusController(PuppetDbStatusService service) {
        super(service);
    }

}
