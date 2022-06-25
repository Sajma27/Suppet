import { Component, OnInit } from '@angular/core';
import { BasicDashboardBrowserMenuComponent } from "../abstract-dashboard-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ModulesService } from "./core/modules.service";
import {
  UniversalBrowserAsyncAction
} from "../../../../commons/universal-browser/model/universal-browser-async-action";
import { UniversalBrowserRow } from "../../../../commons/universal-browser/model/universal-browser-row";

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: '../abstract-dashboard-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardModulesComponent extends BasicDashboardBrowserMenuComponent<ModulesService> implements OnInit {

  constructor(service: ModulesService) {
    super(service);
  }

  ngOnInit(): void {
  }

  getTitle(): string {
    return 'Moduły';
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAsyncAction(
        'Aktualizuj', 'update',
        (row: UniversalBrowserRow) => this.browserService.upgrade(row), true,
        (row: UniversalBrowserRow) => 'Aktualizacja modułu: ' + row.data.name, true),
      new UniversalBrowserAsyncAction(
        'Akt. do najnowszej wersji', 'update',
        (row: UniversalBrowserRow) => this.browserService.upgradeToNewest(row), true,
        (row: UniversalBrowserRow) => 'Aktualizacja modułu: ' + row.data.name, true)
    ];
  }
}
