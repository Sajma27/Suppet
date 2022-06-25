package com.dyplom.suppet.api.common;

import com.dyplom.suppet.service.common.AbstractBrowserCRUDService;
import com.dyplom.suppet.service.common.BrowserActionResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public abstract class AbstractBrowserCRUDController<DTO> extends AbstractBrowserController<AbstractBrowserCRUDService<DTO>> {

    protected AbstractBrowserCRUDController(AbstractBrowserCRUDService<DTO> service) {
        super(service);
    }

    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public DTO get(@RequestBody DTO dto) {
        return service.get(dto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public BrowserActionResult add(@RequestBody DTO dto) {
        return service.add(dto);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public BrowserActionResult edit(@RequestBody DTO dto) {
        return service.edit(dto);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public BrowserActionResult delete(@RequestBody DTO dto) {
        return service.delete(dto);
    }
}
