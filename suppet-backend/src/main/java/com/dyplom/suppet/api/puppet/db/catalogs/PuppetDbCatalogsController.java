package com.dyplom.suppet.api.puppet.db.catalogs;

import com.dyplom.suppet.api.puppet.db.AbstractPuppetDbController;
import com.dyplom.suppet.service.puppet.db.catalogs.PuppetDbCatalogsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet/catalogs")
@CrossOrigin
public class PuppetDbCatalogsController extends AbstractPuppetDbController<PuppetDbCatalogsService> {
    private final Logger logger = LoggerFactory.getLogger("PuppetCatalogsController");

    @Autowired
    public PuppetDbCatalogsController(PuppetDbCatalogsService service) {
        super(service);
    }
}
