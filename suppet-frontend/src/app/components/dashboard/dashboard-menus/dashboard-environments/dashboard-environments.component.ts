import { Component } from '@angular/core';
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { UniversalBrowserRow } from "../../../../commons/universal-browser/model/universal-browser-row";
import {
  BasicDashboardBrowserCrudMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component";
import { EnvironmentsService } from "./core/environments-service";
import { CopyEnvironmentFormComponent } from "./forms/copy-environment-form.component";
import {
  UniversalBrowserFormMode
} from "../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-mode";
import { EnvironmentFormComponent } from "./forms/environment-form.component";
import {
  GlobalProcessesUtils
} from "../../../../commons/common-components/global-processes-browser/core/global-processes.utils";
import _ from "lodash";
import {
  ActiveEnvironmentManager
} from "../../../../commons/active-environment-manager/active-environment-manager.service";

@Component({
  selector: 'app-dashboard-environments',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.scss']
})
export class DashboardEnvironmentsComponent extends BasicDashboardBrowserCrudMenuComponent<EnvironmentsService> {
  private readonly READONLY_ENVS: string[] = ['production'];

  constructor(service: EnvironmentsService,
              private environmentManager: ActiveEnvironmentManager) {
    super(service);
    this.browserConfig.environmentFieldName = null;
    this.browserConfig.formComponent = EnvironmentFormComponent;
    this.browserConfig.hideEditAction = true;
    this.browserConfig.withValidation = false;
    this.browserConfig.usingTotalRowCount = false;
    this.browserConfig.deleteDisabledFunc = (row: UniversalBrowserRow) => this.rowIsNilOrReadonly(row);
  }

  getTitle(): string {
    return 'Środowiska';
  }

  getDescription(): string {
    return "Panel pozwala na tworzenie, usuwanie, kopiowanie środowisk oraz ustawianie aktywnego środowiska.";
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAction('Ustaw środowisko', 'park',
        (row: UniversalBrowserRow) => this.environmentManager.activeEnvironment = row.data.name,
        true),
      new UniversalBrowserAction('Kopiuj', 'folder_copy',
        (row: UniversalBrowserRow) =>
          GlobalProcessesUtils.runProcess('Kopiowanie środowiska: ' + row.data.name, this.browserService.copy(row)),
        (row: UniversalBrowserRow) => this.rowIsNilOrReadonly(row),
        true, CopyEnvironmentFormComponent, UniversalBrowserFormMode.CUSTOM)
    ];
  }

  private rowIsNilOrReadonly(row: UniversalBrowserRow): boolean {
    return _.isNil(row) || this.READONLY_ENVS.includes(row.data.name);
  }
}
