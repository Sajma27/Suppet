package com.dyplom.suppet.service.puppet.db;

import com.dyplom.suppet.api.puppet.db.PuppetDbParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;

public abstract class AbstractPuppetDbService {

    private final Logger log = LoggerFactory.getLogger("AbstractPuppetDbService");

    protected abstract String getBaseUrl();

    public String getAllWithParams(PuppetDbParams params) throws IOException, InterruptedException {
        return runCommand(params, "");
    }

    protected String runCommand(PuppetDbParams params, String additionalUrl) throws IOException, InterruptedException {
        additionalUrl = additionalUrl != null ? additionalUrl : "";

        ArrayList<String> command = new ArrayList<>(Arrays.asList(
                "sudo", "curl", "-G", this.getBaseUrl() + additionalUrl,
                "--tlsv1", "--cacert" ,"/etc/puppetlabs/puppet/ssl/certs/ca.pem",
                "--cert", "/etc/puppetlabs/puppet/ssl/certs/puppet-master.home.pem",
                "--key", "/etc/puppetlabs/puppet/ssl/private_keys/puppet-master.home.pem",
                "--data-urlencode", "query=" + params.getQueryAsString(),
                "--data-urlencode", "limit=" + params.getLimit(),
                "--data-urlencode", "offset=" + params.getOffset(),
                "--data-urlencode", "order_by=" + Arrays.toString(params.getOrderBy())
        ));
        params.getAdditionalParams().forEach((key, value) -> {
            command.add("--data-urlencode");
            command.add(key + "=");
            command.add(value);
        });
        String[] commandArray = {};
        command.toArray(commandArray);
        Process p = Runtime.getRuntime().exec(commandArray);

        BufferedReader inputStream = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        StringBuilder builder = new StringBuilder();
        String line;
        while (p.isAlive()) {
            while ((line = inputStream.readLine()) != null) {
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
