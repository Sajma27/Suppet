import { UniversalBrowserRow } from "./universal-browser-row";

export class UniversalBrowserAction {
  name: string;
  icon: string;
  callback: Function;
  disabledOnNoRow: boolean;
  private isDisabled: boolean = false;

  constructor(name: string, icon: string, callback: Function, disabledOnNoRow: boolean = false) {
    this.name = name;
    this.icon = icon;
    this.callback = callback;
    this.disabledOnNoRow = disabledOnNoRow;
  }

  isRowDisabled(row: UniversalBrowserRow): boolean {
    return this.isDisabled || (this.disabledOnNoRow && !row);
  }

  disable(): void {
    this.isDisabled = true;
  }

  enable(): void {
    this.isDisabled = false;
  }
}
