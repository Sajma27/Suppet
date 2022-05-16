package com.dyplom.suppet.api.db.reports;

import com.dyplom.suppet.api.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppetdb.reports.PuppetDbReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet-db/reports")
@CrossOrigin
public class PuppetDbReportsController extends AbstractPuppetDbController<PuppetDbReportsService> {

    @Autowired
    public PuppetDbReportsController(PuppetDbReportsService service) {
        super(service);
    }

}
