import { UniversalBrowserRow } from "./universal-browser-row";
import _ from "lodash";
import { Type } from "@angular/core";
import { UniversalBrowserFormComponent } from "../universal-browser-form/universal-browser-form.component";
import { UniversalBrowserFormMode } from "../universal-browser-form/model/universal-browser-form-mode";
import { UniversalBrowserActionResult } from "./universal-browser-action-result";
import { Observable } from "rxjs";

export type booleanFuncOrValue = ((row: UniversalBrowserRow) => boolean) | boolean;

export class UniversalBrowserAction {
  name: string;
  icon: string;
  disabledOnRow: (row: UniversalBrowserRow) => boolean;
  protected callback: Function;
  protected refreshOnCallback: boolean;
  protected browserRefreshFunc: Function;
  private isDisabled: boolean = false;
  private readonly formComponent: Type<UniversalBrowserFormComponent<any, any>>;
  private readonly formMode: UniversalBrowserFormMode;
  private readonly disabledFormFields: string[];
  private readonly withFormsLoadingFromBackend: boolean;
  private readonly validationMethod: (dto: any) => Observable<UniversalBrowserActionResult>;

  constructor(name: string, icon: string, callback: Function, disabledOnRow: booleanFuncOrValue = false,
              refreshOnCallback: boolean = false, formComponent: Type<UniversalBrowserFormComponent<any, any>> = null,
              formMode: UniversalBrowserFormMode = UniversalBrowserFormMode.CUSTOM, disabledFormFields: string[] = [],
              withFormsLoadingFromBackend: boolean = false,
              validationMethod: (dto: any) => Observable<UniversalBrowserActionResult> = null) {
    this.name = name;
    this.icon = icon;
    this.refreshOnCallback = refreshOnCallback;
    this.callback = callback;
    if (typeof disabledOnRow === 'boolean') {
      this.disabledOnRow = (row: UniversalBrowserRow) => disabledOnRow && _.isNil(row);
    } else {
      this.disabledOnRow = (row: UniversalBrowserRow) => {
        return _.isNil(row) || disabledOnRow(row);
      };
    }
    this.formComponent = formComponent;
    this.formMode = formMode;
    this.disabledFormFields = disabledFormFields;
    this.withFormsLoadingFromBackend = withFormsLoadingFromBackend;
    this.validationMethod = validationMethod;
  }

  runCallback(row: UniversalBrowserRow): void {
    this.callback(row);
    if (this.refreshOnCallback) {
      this.browserRefreshFunc();
    }
  }

  isRowDisabled(row: UniversalBrowserRow): boolean {
    return this.isDisabled || this.disabledOnRow(row);
  }

  disable(): void {
    this.isDisabled = true;
  }

  enable(): void {
    this.isDisabled = false;
  }

  setBrowserRefreshFunc(browserRefreshFunc: Function): void {
    this.browserRefreshFunc = browserRefreshFunc;
  }

  getFormComponent(): Type<UniversalBrowserFormComponent<any, any>> {
    return this.formComponent;
  }

  getFormMode(): UniversalBrowserFormMode {
    return this.formMode;
  }

  getDisabledFormFields(): string[] {
    return this.disabledFormFields;
  }

  getValidationMethod(): (dto: any) => Observable<UniversalBrowserActionResult> {
    return this.validationMethod;
  }

  getWithFormsLoadingFromBackend(): boolean {
    return this.withFormsLoadingFromBackend;
  }
}
