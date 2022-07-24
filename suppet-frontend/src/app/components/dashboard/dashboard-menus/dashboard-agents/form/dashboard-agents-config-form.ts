import {
  UniversalBrowserFormComponent
} from "../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import { AgentsConfig } from "../model/agents-config";
import {
  UniversalBrowserFormField
} from "../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-field";
import { Component } from "@angular/core";

@Component({
  selector: 'app-agents-config-form',
  templateUrl: '../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component.html'
})
export class DashboardAgentsConfigForm extends UniversalBrowserFormComponent<DashboardAgentsConfigForm, AgentsConfig> {

  getFormTitle(): string {
    return 'Konfiguracja agenta';
  }

  protected initFormFields() {
    this.formFields = [
      new UniversalBrowserFormField('environment', 'Środowisko', 'text', true),
      new UniversalBrowserFormField('runinterval', 'Interwał aktualizacji', 'text', false),
    ];
  }

}
