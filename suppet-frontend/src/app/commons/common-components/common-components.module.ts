import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { GlobalProcessesBrowserComponent } from "./global-processes-browser/ui/global-processes-browser.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

const components = [SpinnerComponent, GlobalProcessesBrowserComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class CommonComponentsModule { }
