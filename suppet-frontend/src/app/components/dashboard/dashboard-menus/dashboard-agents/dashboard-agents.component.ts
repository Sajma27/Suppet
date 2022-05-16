import { Component, OnInit } from '@angular/core';
import { PuppetDbNodesService } from "../../../../commons/puppet-db/nodes/puppet-db-nodes.service";
import { UniversalBrowserConfig } from "../../../universal-browser/model/universal-browser-config";

@Component({
  selector: 'app-dashboard-agents',
  templateUrl: './dashboard-agents.component.html',
  styleUrls: ['./dashboard-agents.component.scss']
})
export class DashboardAgentsComponent implements OnInit {

  private agentsBrowserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  constructor(public readonly service: PuppetDbNodesService) {
    this.agentsBrowserConfig.title = 'Agenci';
  }

  ngOnInit(): void {
  }

  getBrowserConfig(): UniversalBrowserConfig {
    return this.agentsBrowserConfig;
  }

}
