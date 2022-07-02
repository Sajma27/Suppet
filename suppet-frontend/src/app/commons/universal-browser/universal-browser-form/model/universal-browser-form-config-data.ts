import { UniversalBrowserFormMode } from "./universal-browser-form-mode";
import { UniversalBrowserActionResult } from "../../model/universal-browser-action-result";
import { Observable } from "rxjs";

export class UniversalBrowserFormConfigData {
  readonly row: any;
  readonly mode: UniversalBrowserFormMode;
  readonly disabledFields: string[];
  readonly onSaveCallback: (dto: any) => void;
  readonly onValidate: (dto: any) => Observable<UniversalBrowserActionResult>;

  constructor(row: any, mode: UniversalBrowserFormMode, disabledFields: string[],
              onSaveCallback: (dto: any) => void,
              onValidate: (dto: any) => Observable<UniversalBrowserActionResult> = null) {
    this.row = row;
    this.mode = mode;
    this.disabledFields = disabledFields;
    this.onSaveCallback = onSaveCallback;
    this.onValidate = onValidate;
  }
}
