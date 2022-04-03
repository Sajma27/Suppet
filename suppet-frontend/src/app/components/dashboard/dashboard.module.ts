import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './ui/dashboard.component';
import {PuppetManifestEditorModule} from "./puppet-manifest-editor/puppet-manifest-editor.module";
import {AuthenticationModule} from "../authentication/authentication.module";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PuppetManifestEditorModule,
    AuthenticationModule
  ]
})
export class DashboardModule { }
