package com.dyplom.suppet.service.common;

public class CommandLineProcessResult {
    private int result;
    private String data;
    private String errorMessage;

    public CommandLineProcessResult() {
    }

    public CommandLineProcessResult(int result, String data, String errorMessage) {
        this.result = result;
        this.data = data;
        this.errorMessage = errorMessage;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
