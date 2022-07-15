import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-class-picker-params-form',
  templateUrl: './class-picker-params-form.component.html',
  styleUrls: ['./class-picker-params-form.component.scss']
})
export class ClassPickerParamsForm {

  get formValue(): Map<string, string> {
    return new Map(Object.entries(this.formGroup.getRawValue()));
  }

  readonly params: string[];

  readonly formGroup: FormGroup;

  private readonly saveCallback: Function;

  constructor(private fb: FormBuilder, protected dialogRef: MatDialogRef<ClassPickerParamsForm>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.params = data.params;
    const controls: any = {};
    this.params.forEach(param => {
      controls[param] = new FormControl();
    })
    this.formGroup = this.fb.group(controls);
    this.saveCallback = data.saveCallback;
  }

  onSaveClick(): void {
    this.saveCallback(this.formValue);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
