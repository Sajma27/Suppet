import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageDialogComponent } from './ui/error-message-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ErrorMessageDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ErrorMessageDialogModule {
}
