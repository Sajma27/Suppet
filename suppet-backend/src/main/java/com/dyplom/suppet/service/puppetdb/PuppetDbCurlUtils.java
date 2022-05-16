package com.dyplom.suppet.service.puppetdb;

import com.dyplom.suppet.api.db.PuppetDbParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;

public class PuppetDbCurlUtils {
    private static final Logger log = LoggerFactory.getLogger("PuppetDbCurlUtils");

    public static ArrayList<String> getDataCommand(PuppetDbParams params, String url) {
        ArrayList<String> command = new ArrayList<>(Arrays.asList(
                "sudo", "curl", "-G", url,
                "--tlsv1", "--cacert", "/etc/puppetlabs/puppet/ssl/certs/ca.pem",
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
        return command;
    }

    public static ArrayList<String> getTotalRowCountCommand(PuppetDbParams params, String url) {
        ArrayList<String> command = new ArrayList<>(Arrays.asList(
                "sudo", "curl", "-vv", "-G", url,
                "--tlsv1", "--cacert", "/etc/puppetlabs/puppet/ssl/certs/ca.pem",
                "--cert", "/etc/puppetlabs/puppet/ssl/certs/puppet-master.home.pem",
                "--key", "/etc/puppetlabs/puppet/ssl/private_keys/puppet-master.home.pem",
                "--data-urlencode", "query=" + params.getQueryAsString(),
                "--data-urlencode", "limit=1",
                "--data-urlencode", "include_total=true"
        ));
        params.getAdditionalParams().forEach((key, value) -> {
            command.add("--data-urlencode");
            command.add(key + "=");
            command.add(value);
        });
        return command;
    }

    public static String getTotalRowCountFromProcess(Process p) throws IOException, InterruptedException {
        BufferedReader errorStream = new BufferedReader(new InputStreamReader(p.getErrorStream()));
        String line;
        String xRecords = null;
        while (p.isAlive() && xRecords == null) {
            while ((line = errorStream.readLine()) != null) {
                if (line.contains("X-Records:")) {
                    xRecords = line;
                }
            }
        }
        log.info(String.valueOf(p.waitFor()));
        p.destroy();
        return xRecords;
    }
}
