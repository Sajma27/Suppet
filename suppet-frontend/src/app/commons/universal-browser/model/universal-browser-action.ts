import { UniversalBrowserRow } from "./universal-browser-row";
import _ from "lodash";

export type booleanFuncOrValue = ((row: UniversalBrowserRow) => boolean) | boolean;

export class UniversalBrowserAction {
  name: string;
  icon: string;
  disabledOnRow: (row: UniversalBrowserRow) => boolean;
  protected callback: Function;
  protected refreshOnCallback: boolean;
  protected browserRefreshFunc: Function;
  private isDisabled: boolean = false;

  constructor(name: string, icon: string, callback: Function, disabledOnRow: booleanFuncOrValue = false, refreshOnCallback: boolean = false) {
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
  }

  runCallback(row: UniversalBrowserRow) {
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
}
