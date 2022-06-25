import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UniversalBrowserFormField } from "./model/universal-browser-form-field";
import { UniversalBrowserRow } from "../model/universal-browser-row";
import { UniversalBrowserFormMode } from "./model/universal-browser-form-mode";
import { UniversalBrowserFormConfigData } from "./model/universal-browser-form-config-data";

@Component({
  selector: 'app-universal-browser-form',
  templateUrl: './universal-browser-form.component.html',
  styleUrls: ['./universal-browser-form.component.scss']
})
export class UniversalBrowserFormComponent<FORM, DTO> implements OnInit {

  get dto(): DTO {
    return this._dto;
  }

  protected formFields: UniversalBrowserFormField[];

  private readonly _dto: DTO;
  private readonly row: UniversalBrowserRow;
  private readonly mode: UniversalBrowserFormMode;
  private readonly disabledFields: string[];

  constructor(protected dialogRef: MatDialogRef<FORM>,
              @Inject(MAT_DIALOG_DATA) data: UniversalBrowserFormConfigData) {
    this.initFormFields();
    this.row = data.row;
    this._dto = this.getDtoFromRow(data.row);
    this.mode = data.mode;
    this.disabledFields = data.disabledFields;
    this.updateFieldsDisablement();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFormTitle(): string {
    throw new Error('getFormTitle not implemented!');
  }

  getDtoFromRow(row: UniversalBrowserRow): DTO {
    throw new Error('getDtoFromRow not implemented!');
  }

  getFormFields(): UniversalBrowserFormField[] {
    return this.formFields;
  }

  getSubmitBtnLabel(): string {
    switch (this.mode) {
      case UniversalBrowserFormMode.NEW:
        return 'Zapisz';
      case UniversalBrowserFormMode.EDIT:
        return 'Edytuj';
      case UniversalBrowserFormMode.DELETE:
        return 'Usuń';
      case UniversalBrowserFormMode.CUSTOM:
        return this.getCustomModeSubmitButton();
    }
    return 'OK';
  }

  getCustomModeSubmitButton(): string {
    return "OK";
  }

  getSubmitBtnClass(): string {
    return 'main-button';
  }

  isFieldDisabled(field: UniversalBrowserFormField) {
    return this.mode === UniversalBrowserFormMode.DELETE || field.disabled;
  }

  protected initFormFields(): void {
    throw new Error('initFormFields not implemented!');
  }

  private updateFieldsDisablement(): void {
    for (const field of this.formFields) {
      switch (this.mode) {
        case UniversalBrowserFormMode.NEW:
          field.disabled = field.disabledOnNew;
          break;
        case UniversalBrowserFormMode.EDIT:
          field.disabled = field.disabledOnEdit;
          break;
        case UniversalBrowserFormMode.CUSTOM:
          field.disabled = this.disabledFields.includes(field.fieldName);
      }
    }
  }
}
