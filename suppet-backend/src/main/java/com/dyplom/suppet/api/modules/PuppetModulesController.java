package com.dyplom.suppet.api.modules;

import com.dyplom.suppet.api.common.AbstractPuppetFilesBrowserCRUDController;
import com.dyplom.suppet.service.common.BrowserActionResult;
import com.dyplom.suppet.service.modules.PuppetModulesService;
import com.dyplom.suppet.service.modules.model.PuppetModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/modules")
@CrossOrigin
public class PuppetModulesController extends AbstractPuppetFilesBrowserCRUDController<PuppetModule> {

    @Autowired
    protected PuppetModulesController(PuppetModulesService service) {
        super(service);
    }


    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public BrowserActionResult update(@RequestBody PuppetModule dto, @RequestParam String newVersion) {
        return ((PuppetModulesService) service).upgrade(dto, newVersion);
    }

    @RequestMapping(value = "/updateToNewest", method = RequestMethod.POST)
    public BrowserActionResult updateToNewest(@RequestBody PuppetModule dto) {
        return ((PuppetModulesService) service).upgrade(dto, null);
    }

}
