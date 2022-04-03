import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PuppetManifestEditorComponent} from "./ui/puppet-manifest-editor.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [PuppetManifestEditorComponent],
  exports: [
    PuppetManifestEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PuppetManifestEditorModule { }
