package com.dyplom.suppet.api.certs;

import com.dyplom.suppet.api.common.AbstractBrowserController;
import com.dyplom.suppet.service.certs.PuppetCertsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/puppet/certs")
@CrossOrigin
public class PuppetCertsController extends AbstractBrowserController<PuppetCertsService> {
    private final Logger logger = LoggerFactory.getLogger("PuppetCertsController");

    @Autowired
    public PuppetCertsController(PuppetCertsService certsService) {
        super(certsService);
    }

    @RequestMapping(value = "/signCert", method = RequestMethod.GET)
    public boolean signCert(@RequestParam String certname) throws IOException, InterruptedException {
        return this.service.signCert(certname);
    }

    @RequestMapping(value = "/revokeCert", method = RequestMethod.GET)
    public boolean revokeCert(@RequestParam String certname) throws IOException, InterruptedException {
        return this.service.revokeCert(certname);
    }

    @RequestMapping(value = "/cleanCert", method = RequestMethod.GET)
    public boolean cleanCert(@RequestParam String certname) throws IOException, InterruptedException {
        return this.service.cleanCert(certname);
    }
}
