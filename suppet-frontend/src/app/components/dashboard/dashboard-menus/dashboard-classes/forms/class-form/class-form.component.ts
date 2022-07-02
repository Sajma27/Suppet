import { Component } from '@angular/core';
import {
  UniversalBrowserFormComponent
} from "../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import {
  UniversalBrowserFormField
} from "../../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-field";
import { ClassDto } from "../../model/class-dto";

@Component({
  selector: 'app-module-form',
  templateUrl: '../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component.html'
})
export class ClassFormComponent extends UniversalBrowserFormComponent<ClassFormComponent, ClassDto> {

  getFormTitle(): string {
    return 'Klasa'
  }

  protected initFormFields() {
    this.formFields = [
      new UniversalBrowserFormField('name', 'Nazwa', 'text', true,false, false, true),
      new UniversalBrowserFormField('content', 'Definicja', 'textarea')
    ];
  }

}
