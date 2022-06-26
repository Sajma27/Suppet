import { Component } from '@angular/core';
import {
  UniversalBrowserFormComponent
} from "../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import { ModuleDto } from "../../model/module-dto";
import {
  UniversalBrowserFormField
} from "../../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-field";

@Component({
  selector: 'app-module-form',
  templateUrl: '../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component.html'
})
export class ModuleFormComponent extends UniversalBrowserFormComponent<ModuleFormComponent, ModuleDto> {

  getFormTitle(): string {
    return 'Moduł'
  }

  protected initFormFields() {
    this.formFields = [
      new UniversalBrowserFormField('name', 'Nazwa', 'text', false, false, true),
      new UniversalBrowserFormField('version', 'Wersja', 'text', false, false, false)
    ];
  }

}
