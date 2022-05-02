package com.dyplom.suppet.service.puppet.db.catalogs;

import com.dyplom.suppet.service.puppet.db.AbstractPuppetDbService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class PuppetDbCatalogsService extends AbstractPuppetDbService {
    private final Logger log = LoggerFactory.getLogger("PuppetNodesService");

    @Override
    protected String getBaseUrl() {
        return "https://puppet-db.home:8081/pdb/query/v4/catalogs";
    }
}
