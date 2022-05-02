package com.dyplom.suppet.service.puppet.db;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public abstract class AbstractPuppetDbService {

    private final Logger log = LoggerFactory.getLogger("AbstractPuppetDbService");

    protected abstract String getBaseUrl();

    public String getAll() throws IOException, InterruptedException {
        return runCommand();
    }

    protected String runCommand() throws IOException, InterruptedException {
        return runCommand("");
    }

    protected String runCommand(String additionalUrl) throws IOException, InterruptedException {
        return runCommand(additionalUrl, "");
    }

    protected String runCommand(String additionalUrl, String query) throws IOException, InterruptedException {
        String[] command = new String[] {
                "sudo", "curl", "-G", this.getBaseUrl() + additionalUrl,
                "--tlsv1", "--cacert" ,"/etc/puppetlabs/puppet/ssl/certs/ca.pem",
                "--cert", "/etc/puppetlabs/puppet/ssl/certs/puppet-master.home.pem",
                "--key", "/etc/puppetlabs/puppet/ssl/private_keys/puppet-master.home.pem",
                "--data-urlencode", query};
        Process p = Runtime.getRuntime().exec(command);

        BufferedReader inputStream = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        StringBuilder builder = new StringBuilder();
        String line;
        while (p.isAlive()) {
            while ((line = inputStream.readLine()) != null) {
                log.info(line);
                builder.append(line);
            }
            while ((line = errorStream.readLine()) != null) {
                log.error(line);
            }
        }

        log.info(String.valueOf(p.waitFor()));
        p.destroy();
        return builder.toString();
    }
}
