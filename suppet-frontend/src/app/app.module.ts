import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PuppetManifestEditorModule} from "./puppet-manifest-editor/puppet-manifest-editor.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PuppetManifestEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
