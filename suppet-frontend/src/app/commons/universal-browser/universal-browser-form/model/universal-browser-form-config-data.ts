import { UniversalBrowserFormMode } from "./universal-browser-form-mode";

export class UniversalBrowserFormConfigData {
  row: any;
  mode: UniversalBrowserFormMode;
  disabledFields: string[];

  constructor(row: any, mode: UniversalBrowserFormMode, disabledFields: string[]) {
    this.row = row;
    this.mode = mode;
    this.disabledFields = disabledFields;
  }
}
