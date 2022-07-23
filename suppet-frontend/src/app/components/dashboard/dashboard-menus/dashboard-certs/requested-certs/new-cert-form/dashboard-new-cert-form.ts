import {
  UniversalBrowserFormComponent
} from "../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import {
  UniversalBrowserFormField
} from "../../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-field";
import { CertDto } from "../../model/cert-dto";
import { Component } from "@angular/core";

@Component({
  selector: 'app-new-cert-form',
  templateUrl: '../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component.html'
})
export class DashboardNewCertForm extends UniversalBrowserFormComponent<DashboardNewCertForm, CertDto> {

  getFormTitle(): string {
    return 'Nowy certyfikat'
  }

  protected initFormFields() {
    this.formFields = [
      new UniversalBrowserFormField('name', 'Adres', 'text', true, false, false, true),
    ];
  }
}
