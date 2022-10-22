import { Component, OnInit } from '@angular/core';
import {
  BasicDashboardBrowserMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ManifestsService } from "./core/manifests.service";
import {
  GlobalProcessesManager
} from "../../../../commons/common-components/global-processes-browser/core/global-processes.manager";

@Component({
  selector: 'app-dashboard-manifests',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardManifestsComponent extends BasicDashboardBrowserMenuComponent<ManifestsService> implements OnInit {

  constructor(service: ManifestsService, processesManager: GlobalProcessesManager) {
    super(service, processesManager);
  }

  ngOnInit(): void {
  }

  getTitle(): string {
    return 'Manifesty';
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }
}
