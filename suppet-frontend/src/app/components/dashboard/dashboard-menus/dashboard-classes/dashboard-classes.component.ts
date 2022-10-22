import { Component } from '@angular/core';
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ClassesService } from "./core/classes.service";
import {
  BasicDashboardBrowserCrudMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component";
import { ClassFormComponent } from "./forms/class-form/class-form.component";
import {
  GlobalProcessesManager
} from "../../../../commons/common-components/global-processes-browser/core/global-processes.manager";

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.scss']
})
export class DashboardClassesComponent extends BasicDashboardBrowserCrudMenuComponent<ClassesService> {

  constructor(service: ClassesService, processesManager: GlobalProcessesManager) {
    super(service, processesManager);
    this.browserConfig.formComponent = ClassFormComponent;
    this.browserConfig.withFormsLoadingFromBackend = true;
    this.browserConfig.usingTotalRowCount = false;
  }

  getTitle(): string {
    return 'Klasy';
  }

  getDescription(): string {
    return "Panel pozwala na tworzenie, edycję oraz usuwanie klas aktywnego środowiska.";
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }
}
