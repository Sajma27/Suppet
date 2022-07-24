import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UniversalBrowserFormField } from "./model/universal-browser-form-field";
import { UniversalBrowserFormMode } from "./model/universal-browser-form-mode";
import { UniversalBrowserFormConfigData } from "./model/universal-browser-form-config-data";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import _ from "lodash";
import { UniversalBrowserActionResult } from "../model/universal-browser-action-result";

@Component({
  selector: 'app-universal-browser-form',
  templateUrl: './universal-browser-form.component.html',
  styleUrls: ['./universal-browser-form.component.scss']
})
export class UniversalBrowserFormComponent<FORM, DTO> implements OnInit {

  get formValue(): DTO {
    return this.formGroup.getRawValue() as DTO;
  }

  formGroup: FormGroup;
  protected formFields: UniversalBrowserFormField[];

  protected loading: boolean = false;
  protected formDisabled: boolean = false;
  protected hasValidationError: boolean = false;
  protected validationErrorMessage: string = '';

  private readonly config: UniversalBrowserFormConfigData;
  private submitBtnLabel: string = 'OK';
  private submitBtnAlwaysEnabled: boolean = false;

  constructor(private fb: FormBuilder, protected dialogRef: MatDialogRef<FORM>,
              @Inject(MAT_DIALOG_DATA) data: UniversalBrowserFormConfigData) {
    this.initFormFields();
    this.config = data;
    this.initForm();
  }

  private initForm(): void {
    this.initSubmitBtn();
    this.updateFieldsDisablement();
    const preparedFields: [string, FormControl][] = this.formFields.map(field =>
      [field.fieldName, new FormControl({ value: this.getDtoField(field.fieldName), disabled: field.disabled })]
    );
    const formGroupObject: any = {};
    preparedFields.forEach(value => formGroupObject[value[0]] = value[1])
    this.formGroup = this.fb.group(formGroupObject)
    this.formDisabled = false;
  }

  private initSubmitBtn(): void {
    switch (this.config.mode) {
      case UniversalBrowserFormMode.NEW:
        this.submitBtnLabel = 'Zapisz';
        break;
      case UniversalBrowserFormMode.EDIT:
        this.submitBtnLabel = 'Edytuj';
        break;
      case UniversalBrowserFormMode.DELETE:
        this.submitBtnLabel = 'Usuń';
        this.submitBtnAlwaysEnabled = true;
        break;
      case UniversalBrowserFormMode.CUSTOM:
        this.submitBtnLabel = this.getCustomModeSubmitButton();
        break;
    }
  }

  ngOnInit(): void {
  }

  onSaveClick(): void {
    if (!_.isNil(this.config.onValidate)) {
      this.validateAndSave();
    } else {
      this.saveAndCloseDialog();
    }
  }

  private validateAndSave(): void {
    this.hasValidationError = false;
    this.validationErrorMessage = '';
    this.formDisabled = true;
    this.loading = true;
    this.updateFieldsDisablement();
    this.config.onValidate(this.formValue).subscribe((result: UniversalBrowserActionResult) => {
      this.loading = false;
      if (result.result === 0) {
        this.saveAndCloseDialog();
      } else {
        this.validationErrorMessage = result.errorMessage;
        this.hasValidationError = true;
        this.formDisabled = false;
        this.updateFieldsDisablement();
      }
    }, error => {
      this.loading = false;
      this.validationErrorMessage = error;
    });
  }

  private saveAndCloseDialog(): void {
    this.config.onSaveCallback(this.formValue);
    this.dialogRef.close();
  }

  displayValidationError(): boolean {
    return this.hasValidationError;
  }

  getValidationErrorMessage(): string {
    return this.validationErrorMessage;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFormTitle(): string {
    throw new Error('getFormTitle not implemented!');
  }

  getFormFields(): UniversalBrowserFormField[] {
    return this.formFields;
  }

  getSubmitBtnLabel(): string {
    return this.submitBtnLabel;
  }

  getCustomModeSubmitButton(): string {
    return "OK";
  }

  getDtoField(fieldName: string): string {
    if (this.config.mode === UniversalBrowserFormMode.NEW) {
      return null;
    }
    return this.config.row.data[fieldName];
  }

  isSubmitBtnDisabled(): boolean {
    return !this.submitBtnAlwaysEnabled && (this.formDisabled || !this.formGroup.valid);
  }

  isFormLoading(): boolean {
    return this.loading;
  }

  protected initFormFields(): void {
    throw new Error('initFormFields not implemented!');
  }

  private updateFieldsDisablement(): void {
    for (const field of this.formFields) {
      switch (this.config.mode) {
        case UniversalBrowserFormMode.NEW:
          field.disabled = this.formDisabled || field.disabledOnNew;
          break;
        case UniversalBrowserFormMode.EDIT:
          field.disabled = this.formDisabled || field.disabledOnEdit;
          break;
        case UniversalBrowserFormMode.DELETE:
          field.disabled = true;
          break;
        case UniversalBrowserFormMode.CUSTOM:
          field.disabled = this.formDisabled || field.disabled || this.config.disabledFields.includes(field.fieldName);
          break;
      }
    }
  }
}
