import { Component, OnInit } from '@angular/core';
import { PuppetDbEventsService } from "../../../../commons/puppet-db/events/puppet-db-events.service";
import { PuppetDbEventCountsService } from "../../../../commons/puppet-db/events/puppet-db-event-counts.service";
import { PuppetDbFactsService } from "../../../../commons/puppet-db/facts/puppet-db-facts.service";
import { PuppetDbFactNamesService } from "../../../../commons/puppet-db/facts/puppet-db-fact-names.service";
import { PuppetDbNodesService } from "../../../../commons/puppet-db/nodes/puppet-db-nodes.service";
import { PuppetDbReportsService } from "../../../../commons/puppet-db/reports/puppet-db-reports.service";
import { PuppetDbStatusService } from "../../../../commons/puppet-db/status/puppet-db-status.service";

@Component({
  selector: 'app-dashboard-main-menu',
  templateUrl: './dashboard-main-menu.component.html',
  styleUrls: ['./dashboard-main-menu.component.scss']
})
export class DashboardMainMenuComponent implements OnInit {

  constructor(
    private puppetDbEventsService: PuppetDbEventsService,
    private puppetDbEventCountsService: PuppetDbEventCountsService,
    private puppetDbFactsService: PuppetDbFactsService,
    private puppetDbFactNamesService: PuppetDbFactNamesService,
    private puppetDbNodesService: PuppetDbNodesService,
    private puppetDbReportsService: PuppetDbReportsService,
    private puppetDbStatusService: PuppetDbStatusService
  ) {
    this.puppetDbEventsService.fetchData().subscribe();
    this.puppetDbEventCountsService.fetchData().subscribe();
    this.puppetDbFactsService.fetchData().subscribe();
    this.puppetDbFactNamesService.fetchData().subscribe();
    this.puppetDbNodesService.fetchData().subscribe();
    this.puppetDbReportsService.fetchData().subscribe();
    this.puppetDbStatusService.fetchData().subscribe();
  }

  ngOnInit(): void {
  }

}
