import { Component, OnInit } from '@angular/core';
import { BasicDashboardBrowserMenuComponent } from "../abstract-dashboard-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { ClassesService } from "./core/classes.service";

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: '../abstract-dashboard-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardClassesComponent extends BasicDashboardBrowserMenuComponent<ClassesService> implements OnInit {

  constructor(service: ClassesService) {
    super(service);
  }

  ngOnInit(): void {
  }

  getTitle(): string {
    return 'Klasy';
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }
}
