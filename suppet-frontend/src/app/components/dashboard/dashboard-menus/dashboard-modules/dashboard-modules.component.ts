import { Component } from '@angular/core';
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ModulesService } from "./core/modules.service";
import {
  UniversalBrowserAsyncAction
} from "../../../../commons/universal-browser/model/universal-browser-async-action";
import { UniversalBrowserRow } from "../../../../commons/universal-browser/model/universal-browser-row";
import { ModuleFormComponent } from "./forms/module-form/module-form.component";
import {
  UniversalBrowserFormMode
} from "../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-mode";
import {
  BasicDashboardBrowserCrudMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component";

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.scss']
})
export class DashboardModulesComponent extends BasicDashboardBrowserCrudMenuComponent<ModulesService> {

  constructor(service: ModulesService) {
    super(service);
    this.browserConfig.formComponent = ModuleFormComponent;
    this.browserConfig.hideEditAction = true;
    this.browserConfig.withValidation = false;
    this.browserConfig.usingTotalRowCount = false;
  }

  getTitle(): string {
    return 'Moduły';
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAsyncAction(
        'Aktualizuj', 'update',
        (row: UniversalBrowserRow) => this.browserService.upgrade(row), true,
        (row: UniversalBrowserRow) => 'Aktualizacja modułu: ' + row.data.name, true,
        ModuleFormComponent, UniversalBrowserFormMode.EDIT),
      new UniversalBrowserAsyncAction(
        'Akt. do najnowszej wersji', 'update',
        (row: UniversalBrowserRow) => this.browserService.upgradeToNewest(row), true,
        (row: UniversalBrowserRow) => 'Aktualizacja modułu: ' + row.data.name, true)
    ];
  }
}
