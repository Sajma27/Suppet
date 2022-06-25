package com.dyplom.suppet.api.classes;

import com.dyplom.suppet.api.common.AbstractPuppetFilesBrowserCRUDController;
import com.dyplom.suppet.service.classes.PuppetClassesService;
import com.dyplom.suppet.service.classes.model.PuppetClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puppet/classes")
@CrossOrigin
public class PuppetClassesController extends AbstractPuppetFilesBrowserCRUDController<PuppetClass> {

    @Autowired
    protected PuppetClassesController(PuppetClassesService service) {
        super(service);
    }

}
