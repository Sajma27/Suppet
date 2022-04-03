import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginButtonComponent} from "./login-button/login-button.component";
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';



@NgModule({
  declarations: [LoginButtonComponent, LogoutButtonComponent, AuthenticationButtonComponent],
  exports: [AuthenticationButtonComponent, LoginButtonComponent, LogoutButtonComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
