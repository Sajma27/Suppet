import { Component } from '@angular/core';

import { EnvironmentDto } from "../model/environment-dto";
import {
  UniversalBrowserFormComponent
} from "../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import {
  UniversalBrowserFormField
} from "../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-field";

@Component({
  selector: 'app-module-form',
  templateUrl: '../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component.html'
})
export class EnvironmentFormComponent extends UniversalBrowserFormComponent<EnvironmentFormComponent, EnvironmentDto> {

  getFormTitle(): string {
    return 'Środowisko'
  }

  protected initFormFields() {
    this.formFields = [
      new UniversalBrowserFormField('name', 'Nazwa', 'text', true)
    ];
  }

}
