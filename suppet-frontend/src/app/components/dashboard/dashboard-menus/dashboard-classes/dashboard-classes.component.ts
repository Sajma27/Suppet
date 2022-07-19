import { Component } from '@angular/core';
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ClassesService } from "./core/classes.service";
import {
  BasicDashboardBrowserCrudMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component";
import { ClassFormComponent } from "./forms/class-form/class-form.component";

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-crud-menu/basic-dashboard-browser-crud-menu.component.scss']
})
export class DashboardClassesComponent extends BasicDashboardBrowserCrudMenuComponent<ClassesService> {

  constructor(service: ClassesService) {
    super(service);
    this.browserConfig.formComponent = ClassFormComponent;
    this.browserConfig.withFormsLoadingFromBackend = true;
    this.browserConfig.usingTotalRowCount = false;
  }

  getTitle(): string {
    return 'Klasy';
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }
}
