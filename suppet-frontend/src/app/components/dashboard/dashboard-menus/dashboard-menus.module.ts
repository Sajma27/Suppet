import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEnvironmentsComponent } from './dashboard-environments/dashboard-environments.component';
import { DashboardAgentsComponent } from './dashboard-agents/dashboard-agents.component';
import { DashboardCatalogsComponent } from './dashboard-catalogs/dashboard-catalogs.component';
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
import { DashboardTasksComponent } from "./dashboard-tasks/dashboard-tasks.component";
import { DashboardModulesComponent } from "./dashboard-modules/dashboard-modules.component";
import { ModuleFormComponent } from "./dashboard-modules/forms/module-form/module-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ClassFormComponent } from "./dashboard-classes/forms/class-form/class-form.component";
import { DashboardNewCertForm } from "./dashboard-certs/requested-certs/new-cert-form/dashboard-new-cert-form";
import { DashboardAgentsConfigForm } from "./dashboard-agents/form/dashboard-agents-config-form";
import { EnvironmentFormComponent } from "./dashboard-environments/forms/environment-form.component";
import { CopyEnvironmentFormComponent } from "./dashboard-environments/forms/copy-environment-form.component";
import { EnvironmentPickerComponent } from "./dashboard-agents/picker/environment/environment-picker.component";
import { ClassPickerComponent } from "./dashboard-agents/picker/class/class-picker.component";
import {
  ClassPickerParamsForm
} from "./dashboard-agents/picker/class/class-params-form/class-picker-params-form.component";

const pickers = [
  ClassPickerComponent,
  ClassPickerParamsForm,
  EnvironmentPickerComponent
]

const forms = [
  ModuleFormComponent,
  ClassFormComponent,
  DashboardNewCertForm,
  DashboardAgentsConfigForm,
  EnvironmentFormComponent,
  CopyEnvironmentFormComponent
];

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
  DashboardEnvironmentsComponent
];

export const routes: Routes = [
  { path: DashboardMenus.ENVIRONMENTS, component: DashboardEnvironmentsComponent },
  { path: DashboardMenus.AGENTS, component: DashboardAgentsComponent },
  { path: DashboardMenus.SIGNED_CERTS, component: DashboardSignedCertsComponent },
  { path: DashboardMenus.UNSIGNED_CERTS, component: DashboardUnsignedCertsComponent },
  { path: DashboardMenus.REQUESTED_CERTS, component: DashboardRequestedCertsComponent },
  { path: DashboardMenus.TASKS, component: DashboardTasksComponent },
  { path: DashboardMenus.MODULES, component: DashboardModulesComponent },
  { path: DashboardMenus.CLASSES, component: DashboardClassesComponent }
];

@NgModule({
  declarations: [...components, ...forms, ...pickers],
  exports: components,
  imports: [
    CommonModule,
    PuppetManifestEditorModule,
    UniversalBrowserModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonComponentsModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ]
})
export class DashboardMenusModule {
}
