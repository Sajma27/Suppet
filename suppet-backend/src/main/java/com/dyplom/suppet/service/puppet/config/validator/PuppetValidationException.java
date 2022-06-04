package com.dyplom.suppet.service.puppet.config.validator;

public class PuppetValidationException extends Exception {

    public PuppetValidationException(String message) {
        super(message);
    }

    public PuppetValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
