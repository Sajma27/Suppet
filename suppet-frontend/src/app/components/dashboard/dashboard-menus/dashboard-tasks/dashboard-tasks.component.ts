import { Component } from '@angular/core';
import {
  BasicDashboardBrowserMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { PuppetDbEventsService } from "../../../../commons/puppet-db/events/puppet-db-events.service";
import {
  GlobalProcessesManager
} from "../../../../commons/common-components/global-processes-browser/core/global-processes.manager";

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardTasksComponent extends BasicDashboardBrowserMenuComponent<PuppetDbEventsService> {

  constructor(service: PuppetDbEventsService, processesManager: GlobalProcessesManager) {
    super(service, processesManager);
  }

  getTitle(): string {
    return 'Zadania';
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }

}
