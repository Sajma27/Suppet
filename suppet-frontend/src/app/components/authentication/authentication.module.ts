import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginButtonComponent} from "./login-button/login-button.component";
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [LoginButtonComponent, LogoutButtonComponent, AuthenticationButtonComponent],
  exports: [AuthenticationButtonComponent, LoginButtonComponent, LogoutButtonComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AuthenticationModule { }
