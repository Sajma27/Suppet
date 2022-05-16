export class UniversalBrowserAction {
  name: string;
  icon: string;
  callback: Function;
  disabledOnNoRow: boolean;

  constructor(name: string, icon: string, callback: Function, disabledOnNoRow: boolean = false) {
    this.name = name;
    this.icon = icon;
    this.callback = callback;
    this.disabledOnNoRow = disabledOnNoRow;
  }
}
