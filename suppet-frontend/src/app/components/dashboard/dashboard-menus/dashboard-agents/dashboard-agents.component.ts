import { Component } from '@angular/core';
import { PuppetDbNodesService } from "../../../../commons/puppet-db/nodes/puppet-db-nodes.service";
import { BasicDashboardBrowserMenuComponent } from "../abstract-dashboard-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { AgentsService } from "./core/agents.service";
import { UniversalBrowserRow } from "../../../../commons/universal-browser/model/universal-browser-row";
import {
  UniversalBrowserAsyncAction
} from "../../../../commons/universal-browser/model/universal-browser-async-action";

@Component({
  selector: 'app-dashboard-agents',
  templateUrl: '../abstract-dashboard-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardAgentsComponent extends BasicDashboardBrowserMenuComponent<PuppetDbNodesService> {

  constructor(service: PuppetDbNodesService,
              private agentsService: AgentsService) {
    super(service);
  }

  getTitle(): string {
    return 'Agenci';
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAsyncAction('Aktualizuj', 'update',
        (row: UniversalBrowserRow) => this.agentsService.updateAgent(row.data.certname),
        (row: UniversalBrowserRow) => !row, (row: UniversalBrowserRow) => 'Aktualizacja agenta: ' + row.data.certname, true)
    ];
  }

}
