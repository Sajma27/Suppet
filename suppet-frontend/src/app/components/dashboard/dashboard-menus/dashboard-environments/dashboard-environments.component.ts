import { Component } from '@angular/core';
import {
  BasicDashboardBrowserMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { PuppetDbEnvironmentService } from "../../../../commons/puppet-db/environment/puppet-db-environment.service";
import { UniversalBrowserRow } from "../../../../commons/universal-browser/model/universal-browser-row";
import {
  ActiveEnvironmentManager
} from "../../../../commons/common-components/active-environment-manager/active-environment-manager.service";

@Component({
  selector: 'app-dashboard-environments',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardEnvironmentsComponent extends BasicDashboardBrowserMenuComponent<PuppetDbEnvironmentService> {

  constructor(service: PuppetDbEnvironmentService, private environmentManager: ActiveEnvironmentManager) {
    super(service);
    this.browserConfig.environmentFieldName = null;
  }

  getTitle(): string {
    return 'Środowiska';
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAction('Ustaw środowisko', 'park',
        (row: UniversalBrowserRow) => this.environmentManager.activeEnvironment = row.data.name, true)
    ];
  }

}
