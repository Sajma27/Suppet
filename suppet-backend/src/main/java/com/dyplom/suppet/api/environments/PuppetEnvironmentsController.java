package com.dyplom.suppet.api.environments;

import com.dyplom.suppet.api.common.AbstractPuppetFilesBrowserCRUDController;
import com.dyplom.suppet.service.common.BrowserActionResult;
import com.dyplom.suppet.service.environments.PuppetEnvironmentsService;
import com.dyplom.suppet.service.environments.model.PuppetEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/puppet/environments")
@CrossOrigin
public class PuppetEnvironmentsController extends AbstractPuppetFilesBrowserCRUDController<PuppetEnvironment> {

    @Autowired
    protected PuppetEnvironmentsController(PuppetEnvironmentsService service) {
        super(service);
    }

    @RequestMapping(value = "/copy", method = RequestMethod.GET)
    public BrowserActionResult copy(@RequestParam String sourceEnvName, @RequestParam String newEnvName) {
        return ((PuppetEnvironmentsService) service).copy(sourceEnvName, newEnvName);
    }
}
