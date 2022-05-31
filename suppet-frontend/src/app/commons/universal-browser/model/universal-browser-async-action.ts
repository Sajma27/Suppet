import { tap } from "rxjs/operators";
import { GlobalProcessesService } from "../../common-components/global-processes-browser/core/global-processes.service";
import { Observable } from "rxjs";
import { UniversalBrowserRow } from "./universal-browser-row";
import { UniversalBrowserAction } from "./universal-browser-action";

export class UniversalBrowserAsyncAction extends UniversalBrowserAction {
  private disabledRowsIds: Set<number> = new Set<number>();
  private readonly getProcessLabel: Function;

  constructor(name: string, icon: string, callback: (row: UniversalBrowserRow) => Observable<any>,
              disabledOnNoRow: boolean = false, getProcessLabel: (row: UniversalBrowserRow) => string = null) {
    super(name, icon, null, disabledOnNoRow);
    this.getProcessLabel = getProcessLabel;
    this.callback = this.getAsyncCallback(callback);
  }

  isRowDisabled(row: UniversalBrowserRow): boolean {
    return super.isRowDisabled(row) || this.disabledRowsIds.has(row.idx);
  }

  private enableRow(row: UniversalBrowserRow): void {
    this.disabledRowsIds.delete(row.idx);
  }

  private disableRow(row: UniversalBrowserRow): void {
    this.disabledRowsIds.add(row.idx);
  }

  private getAsyncCallback(callback: (row: UniversalBrowserRow) => Observable<any>): Function {
    return (row: UniversalBrowserRow) => {
      this.disableRow(row);
      const asyncCallback: Observable<any> = callback(row).pipe(tap(() => this.enableRow(row), () => this.enableRow(row)));
      GlobalProcessesService.runProcess(this.getProcessLabel(row), asyncCallback);
    }
  }

}
