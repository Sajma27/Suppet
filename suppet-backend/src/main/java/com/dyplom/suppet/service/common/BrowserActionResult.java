package com.dyplom.suppet.service.common;

public class BrowserActionResult {
    private int result;
    private String errorMessage;

    public BrowserActionResult() {
    }

    public BrowserActionResult(CommandLineProcessResult commandLineProcessResult) {
        this.result = commandLineProcessResult.getResult();
        if (commandLineProcessResult.getErrorMessage() != null && !commandLineProcessResult.getErrorMessage().isEmpty()) {
            this.errorMessage = commandLineProcessResult.getErrorMessage();
        } else {
            this.errorMessage = commandLineProcessResult.getData();
        }
    }

    public BrowserActionResult(int result) {
        this.result = result;
    }

    public BrowserActionResult(boolean result) {
        this.result = result ? 0 : 1;
    }

    public BrowserActionResult(int result, String errorMessage) {
        this.result = result;
        this.errorMessage = errorMessage;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
