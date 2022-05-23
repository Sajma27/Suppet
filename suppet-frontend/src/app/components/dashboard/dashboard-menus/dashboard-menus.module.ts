import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainMenuComponent } from './dashboard-main-menu/dashboard-main-menu.component';
import { DashboardAgentsComponent } from './dashboard-agents/dashboard-agents.component';
import { DashboardCertsComponent } from './dashboard-certs/dashboard-certs.component';
import { DashboardCatalogsComponent } from './dashboard-catalogs/dashboard-catalogs.component';
import { DashboardTasksComponent } from './dashboard-tasks/dashboard-tasks.component';
import { DashboardModulesComponent } from './dashboard-modules/dashboard-modules.component';
import { DashboardClassesComponent } from './dashboard-classes/dashboard-classes.component';
import { DashboardManifestsComponent } from './dashboard-manifests/dashboard-manifests.component';
import { PuppetManifestEditorModule } from "../puppet-manifest-editor/puppet-manifest-editor.module";
import { BasicDashboardBrowserMenuComponent } from './abstract-dashboard-menu/basic-dashboard-browser-menu.component';
import { UniversalBrowserModule } from "../../../commons/universal-browser/universal-browser.module";
import { CommonComponentsModule } from "../../../commons/common-components/common-components.module";

@NgModule({
  declarations: [
    DashboardMainMenuComponent,
    DashboardAgentsComponent,
    DashboardCertsComponent,
    DashboardCatalogsComponent,
    DashboardTasksComponent,
    DashboardModulesComponent,
    DashboardClassesComponent,
    DashboardManifestsComponent,
    BasicDashboardBrowserMenuComponent
  ],
  exports: [
    DashboardTasksComponent,
    DashboardManifestsComponent,
    DashboardClassesComponent,
    DashboardModulesComponent,
    DashboardCatalogsComponent,
    DashboardCertsComponent,
    DashboardAgentsComponent,
    DashboardMainMenuComponent
  ],
  imports: [
    CommonModule,
    PuppetManifestEditorModule,
    UniversalBrowserModule,
    CommonComponentsModule
  ]
})
export class DashboardMenusModule { }
