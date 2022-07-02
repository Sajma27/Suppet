package com.dyplom.suppet.service.common;

public abstract class AbstractBrowserCRUDService<DTO> extends AbstractBrowserService {

    public abstract DTO get(DTO dto);

    public abstract BrowserActionResult add(DTO dto);

    public abstract BrowserActionResult edit(DTO dto);

    public abstract BrowserActionResult delete(DTO dto);

    public BrowserActionResult validateAdd(DTO dto) {
        return new BrowserActionResult(0);
    }

    public BrowserActionResult validateEdit(DTO dto) {
        return new BrowserActionResult(0);
    }
}
