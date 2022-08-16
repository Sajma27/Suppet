import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [LogoutButtonComponent],
  exports: [LogoutButtonComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AuthenticationModule { }
