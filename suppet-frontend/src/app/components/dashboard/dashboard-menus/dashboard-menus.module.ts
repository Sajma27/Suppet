import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainMenuComponent } from './dashboard-main-menu/dashboard-main-menu.component';
import { DashboardAgentsComponent } from './dashboard-agents/dashboard-agents.component';
import { DashboardCatalogsComponent } from './dashboard-catalogs/dashboard-catalogs.component';
import { DashboardTasksComponent } from './dashboard-tasks/dashboard-tasks.component';
import { DashboardModulesComponent } from './dashboard-modules/dashboard-modules.component';
import { DashboardClassesComponent } from './dashboard-classes/dashboard-classes.component';
import { DashboardManifestsComponent } from './dashboard-manifests/dashboard-manifests.component';
import { PuppetManifestEditorModule } from "../puppet-manifest-editor/puppet-manifest-editor.module";
import { UniversalBrowserModule } from "../../../commons/universal-browser/universal-browser.module";
import { CommonComponentsModule } from "../../../commons/common-components/common-components.module";
import { DashboardSignedCertsComponent } from "./dashboard-certs/signed-certs/dashboard-signed-certs.component";
import { DashboardUnsignedCertsComponent } from "./dashboard-certs/unsigned-certs/dashboard-unsigned-certs.component";
import {
  DashboardRequestedCertsComponent
} from "./dashboard-certs/requested-certs/dashboard-requested-certs.component";
import { Routes } from "@angular/router";
import { DashboardMenus } from "./model/dashboard-menus";

const components = [
  DashboardTasksComponent,
  DashboardManifestsComponent,
  DashboardClassesComponent,
  DashboardModulesComponent,
  DashboardCatalogsComponent,
  DashboardSignedCertsComponent,
  DashboardUnsignedCertsComponent,
  DashboardRequestedCertsComponent,
  DashboardAgentsComponent,
  DashboardMainMenuComponent
];

export const routes: Routes = [
  { path: DashboardMenus.TASKS, component: DashboardTasksComponent },
  { path: DashboardMenus.CLASSES, component: DashboardClassesComponent },
  { path: DashboardMenus.MODULES, component: DashboardModulesComponent },
  { path: DashboardMenus.SIGNED_CERTS, component: DashboardSignedCertsComponent },
  { path: DashboardMenus.UNSIGNED_CERTS, component: DashboardUnsignedCertsComponent },
  { path: DashboardMenus.REQUESTED_CERTS, component: DashboardRequestedCertsComponent },
  { path: DashboardMenus.AGENTS, component: DashboardAgentsComponent },
  { path: DashboardMenus.MAIN_MENU, component: DashboardMainMenuComponent },
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    PuppetManifestEditorModule,
    UniversalBrowserModule,
    CommonComponentsModule
  ]
})
export class DashboardMenusModule { }
