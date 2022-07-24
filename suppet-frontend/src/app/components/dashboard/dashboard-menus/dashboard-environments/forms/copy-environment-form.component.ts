import { Component } from '@angular/core';
import {
  UniversalBrowserFormComponent
} from "../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import {
  UniversalBrowserFormField
} from "../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-field";
import { CopyEnvironmentDto } from "../model/copy-environment-dto";

@Component({
  selector: 'app-module-form',
  templateUrl: '../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component.html'
})
export class CopyEnvironmentFormComponent extends UniversalBrowserFormComponent<CopyEnvironmentFormComponent, CopyEnvironmentDto> {

  getFormTitle(): string {
    return 'Środowisko'
  }

  protected initFormFields() {
    this.formFields = [
      new UniversalBrowserFormField('name', 'Nazwa', 'text', true, true),
      new UniversalBrowserFormField('newEnvName', 'Nazwa nowego środowiska', 'text', true),
    ];
  }

}
