import { Component } from '@angular/core';
import { PuppetDbNodesService } from "../../../../commons/puppet-db/nodes/puppet-db-nodes.service";
import { BasicDashboardBrowserMenuComponent } from "../abstract-dashboard-menu/basic-dashboard-browser-menu.component";

@Component({
  selector: 'app-dashboard-agents',
  templateUrl: '../abstract-dashboard-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardAgentsComponent extends BasicDashboardBrowserMenuComponent {

  constructor(service: PuppetDbNodesService) {
    super(service);
  }

  getTitle(): string {
    return 'Agenci';
  }

}
