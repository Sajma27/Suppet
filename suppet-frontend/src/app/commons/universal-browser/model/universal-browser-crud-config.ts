import { UniversalBrowserFormComponent } from "../universal-browser-form/universal-browser-form.component";
import { Type } from "@angular/core";
import { UniversalBrowserConfig } from "./universal-browser-config";
import { UniversalBrowserRow } from "./universal-browser-row";

export class UniversalBrowserCrudConfig extends UniversalBrowserConfig {
  formComponent: Type<UniversalBrowserFormComponent<any, any>> = null;
  hideNewAction: boolean = false;
  hideEditAction: boolean = false;
  hideDeleteAction: boolean = false;
  withValidation: boolean = true;
  withFormsLoadingFromBackend: boolean = false;
  editDisabledFunc: (row: UniversalBrowserRow) => boolean = null;
  deleteDisabledFunc: (row: UniversalBrowserRow) => boolean = null;
}
