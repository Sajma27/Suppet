import { tap } from "rxjs/operators";
import { GlobalProcessesManager } from "../../common-components/global-processes-browser/core/global-processes.manager";
import { Observable } from "rxjs";
import { UniversalBrowserRow } from "./universal-browser-row";
import { booleanFuncOrValue, UniversalBrowserAction } from "./universal-browser-action";
import _ from "lodash";
import {
  GlobalProcessBackendResponse
} from "../../common-components/global-processes-browser/model/global-process-backend-response";
import { UniversalBrowserFormComponent } from "../universal-browser-form/universal-browser-form.component";
import { Type } from "@angular/core";
import { UniversalBrowserFormMode } from "../universal-browser-form/model/universal-browser-form-mode";
import { UniversalBrowserActionResult } from "./universal-browser-action-result";

export class UniversalBrowserAsyncAction extends UniversalBrowserAction {
  private disabledRowsIds: Set<number> = new Set<number>();
  private readonly getProcessLabel: Function;

  constructor(private processesManager: GlobalProcessesManager, name: string, icon: string,
              callback: (row: UniversalBrowserRow) => Observable<GlobalProcessBackendResponse>,
              disabledOnNoRow: booleanFuncOrValue = false, getProcessLabel: (row: UniversalBrowserRow) => string = null,
              refreshOnCallback: boolean = false, formComponent: Type<UniversalBrowserFormComponent<any, any>> = null,
              formMode: UniversalBrowserFormMode = UniversalBrowserFormMode.CUSTOM, disabledFormFields: string[] = [],
              withFormsLoadingFromBackend: boolean = false,
              validationMethod: (dto: any) => Observable<UniversalBrowserActionResult> = null) {
    super(name, icon, null, disabledOnNoRow, refreshOnCallback, formComponent, formMode, disabledFormFields, withFormsLoadingFromBackend, validationMethod);
    this.getProcessLabel = getProcessLabel;
    this.callback = this.getAsyncCallback(callback);
  }

  runCallback(row: UniversalBrowserRow) {
    this.callback(row);
  }

  isRowDisabled(row: UniversalBrowserRow): boolean {
    return super.isRowDisabled(row) || (!_.isNil(row?.idx) && this.disabledRowsIds.has(row.idx));
  }

  private enableRow(row: UniversalBrowserRow): void {
    if (!_.isNil(row?.idx)) {
      this.disabledRowsIds.delete(row.idx);
    }
  }

  private disableRow(row: UniversalBrowserRow): void {
    if (!_.isNil(row?.idx)) {
      this.disabledRowsIds.add(row.idx);
    }
  }

  private getAsyncCallback(callback: (row: UniversalBrowserRow) => Observable<GlobalProcessBackendResponse>): Function {
    return (row: UniversalBrowserRow) => {
      this.disableRow(row);
      const asyncCallback: Observable<any> = callback(row).pipe(tap(() => this.afterCallbackFunction(row), () => this.afterCallbackFunction(row)));
      this.processesManager.runProcess(this.getProcessLabel(row), asyncCallback);
    }
  }

  private afterCallbackFunction(row: UniversalBrowserRow): void {
    this.enableRow(row);
    if (this.refreshOnCallback) {
      this.browserRefreshFunc();
    }
  }

}
