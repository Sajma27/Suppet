import { Component } from '@angular/core';
import { BasicDashboardBrowserMenuComponent } from "../abstract-dashboard-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { PuppetDbEventsService } from "../../../../commons/puppet-db/events/puppet-db-events.service";

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: '../abstract-dashboard-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardTasksComponent extends BasicDashboardBrowserMenuComponent<PuppetDbEventsService> {

  constructor(service: PuppetDbEventsService) {
    super(service);
  }

  getTitle(): string {
    return 'Zadania';
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }

}
