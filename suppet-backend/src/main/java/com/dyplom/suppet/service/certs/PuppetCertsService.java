package com.dyplom.suppet.service.certs;

import com.dyplom.suppet.service.common.CurlUtils;
import com.dyplom.suppet.service.common.UniversalBrowserFullDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class PuppetCertsService {
    private final Logger log = LoggerFactory.getLogger("PuppetCertsService");

    public void getCerts(UniversalBrowserFullDto params) throws IOException, InterruptedException {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("bolt", "command", "run", "sudo /opt/puppetlabs/bin/puppet agent -t",
                "--no-host-key-check"));
        Process p = CurlUtils.getProcess(command);
        StringBuilder data = CurlUtils.getDataFromProcess(p);
    }

}
