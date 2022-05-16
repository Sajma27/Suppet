import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalBrowserComponent } from './ui/universal-browser.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { UniversalBrowserActionButtonComponent } from './universal-browser-action-button/universal-browser-action-button.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { MatDividerModule } from "@angular/material/divider";



@NgModule({
  declarations: [
    UniversalBrowserComponent,
    UniversalBrowserActionButtonComponent
  ],
  exports: [
    UniversalBrowserComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatDividerModule
  ]
})
export class UniversalBrowserModule { }
