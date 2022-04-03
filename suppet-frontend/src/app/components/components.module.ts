import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationModule} from "./authentication/authentication.module";
import {DashboardModule} from "./dashboard/dashboard.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationModule,
    DashboardModule
  ]
})
export class ComponentsModule {
}
