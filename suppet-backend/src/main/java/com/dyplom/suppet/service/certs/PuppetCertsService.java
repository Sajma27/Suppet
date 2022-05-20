package com.dyplom.suppet.service.certs;

import com.dyplom.suppet.api.common.UniversalBrowserParams;
import com.dyplom.suppet.service.common.AbstractBrowserService;
import com.dyplom.suppet.service.common.CurlUtils;
import com.dyplom.suppet.service.common.UniversalBrowserHeader;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

@Service
public class PuppetCertsService extends AbstractBrowserService {
    private final Logger log = LoggerFactory.getLogger("PuppetCertsService");

    @Override
    protected UniversalBrowserHeader[] getHeaders() {
        return new UniversalBrowserHeader[]{
                new UniversalBrowserHeader("name", "Nazwa"),
                new UniversalBrowserHeader("not_before", "Ważny od"),
                new UniversalBrowserHeader("not_after", "Ważny do"),
        };
    }

    @Override
    protected ArrayList<String> getFetchDataCommand(UniversalBrowserParams params, String additionalUrl) {
        return new ArrayList<>(Arrays.asList("sudo", "/opt/puppetlabs/bin/puppetserver", "ca", "list", "--all", "--format", "json"));
    }

    @Override
    protected JsonNode applyAdditionalParams(UniversalBrowserParams params, JsonNode data) {
        boolean revoked = Arrays.stream(params.getAdditionalParams()).anyMatch(param -> Objects.equals(param.getName(), "revoked"));
        if (revoked) {
            return data.get("revoked");
        }
        return data.get("signed");
    }

    public boolean signCert(String certname) throws IOException, InterruptedException {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("sudo", "puppetserver", "ca", "sign", "--certname", certname));
        Process p = CurlUtils.getProcess(command);
        return CurlUtils.getResultFromProcess(p) == 0;
    }

    public boolean revokeCert(String certname) throws IOException, InterruptedException {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("sudo", "puppetserver", "ca", "revoke", "--certname", certname));
        Process p = CurlUtils.getProcess(command);
        return CurlUtils.getResultFromProcess(p) == 0;
    }

    public boolean cleanCert(String certname) throws IOException, InterruptedException {
        ArrayList<String> command = new ArrayList<>(Arrays.asList("sudo", "puppetserver", "ca", "clean", "--certname", certname));
        Process p = CurlUtils.getProcess(command);
        return CurlUtils.getResultFromProcess(p) == 0;
    }
}
