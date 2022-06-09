package com.dyplom.suppet.service.puppet.validator;

public class PuppetValidationException extends Exception {

    public PuppetValidationException(String message) {
        super(message);
    }

    public PuppetValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
