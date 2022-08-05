import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html',
  styleUrls: ['./error-message-dialog.component.scss']
})
export class ErrorMessageDialogComponent implements OnInit {

  constructor(protected dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public readonly data: { errorMessage: string }) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
