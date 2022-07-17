import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClassParamDto } from "../../model/class-param-dto";
import { ClassDto } from "../../model/class-dto";

@Component({
  selector: 'app-class-picker-params-form',
  templateUrl: './class-picker-params-form.component.html',
  styleUrls: ['./class-picker-params-form.component.scss']
})
export class ClassPickerParamsForm {

  get formValue(): ClassDto {
    const formValue: any = this.formGroup.value;
    this.classDto.params.forEach((param: ClassParamDto, idx: number, arr: ClassParamDto[]) => {
      arr[idx].value = formValue[param.name];
    })
    return this.classDto;
  }

  readonly CONTENT_VIEW_NAME: string = 'classContent';

  readonly classDto: ClassDto;
  readonly formGroup: FormGroup;

  private readonly saveCallback: Function;

  constructor(private fb: FormBuilder, protected dialogRef: MatDialogRef<ClassPickerParamsForm>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.classDto = data.classDto;
    this.classDto.params = data.classDto.params;
    const controls: any = {};
    this.classDto.params.forEach(param => {
      controls[param.name] = new FormControl();
    })
    controls[this.CONTENT_VIEW_NAME] = new FormControl({ value: this.classDto.content, disabled: true });
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
