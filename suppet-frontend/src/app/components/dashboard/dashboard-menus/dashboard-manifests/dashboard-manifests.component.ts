import { Component, OnInit } from '@angular/core';
import { BasicDashboardBrowserMenuComponent } from "../abstract-dashboard-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ManifestsService } from "./core/manifests.service";

@Component({
  selector: 'app-dashboard-manifests',
  templateUrl: '../abstract-dashboard-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardManifestsComponent extends BasicDashboardBrowserMenuComponent<ManifestsService> implements OnInit {

  constructor(service: ManifestsService) {
    super(service);
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
