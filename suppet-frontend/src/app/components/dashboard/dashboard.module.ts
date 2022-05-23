import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './ui/dashboard.component';
import { AuthenticationModule } from "../authentication/authentication.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { AppRoutingModule } from "../../app-routing.module";
import { DashboardMenusModule } from "./dashboard-menus/dashboard-menus.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    DashboardMenusModule
  ]
})
export class DashboardModule {
}
