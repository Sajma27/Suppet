import { Component, Input } from '@angular/core';
import { UniversalBrowserAction } from "../../model/universal-browser-action";

@Component({
  selector: 'app-universal-browser-action-button',
  templateUrl: './universal-browser-action-button.component.html',
  styleUrls: ['./universal-browser-action-button.component.scss']
})
export class UniversalBrowserActionButtonComponent {

  @Input() row: any;
  @Input() universalBrowserAction: UniversalBrowserAction;
  @Input() disabled: boolean;
  @Input() refreshFunc: Function;

  isDisabled(): boolean {
    return this.disabled || this.universalBrowserAction.isRowDisabled(this.row);
  }

  onClick(): void {
    this.universalBrowserAction.setBrowserRefreshFunc(this.refreshFunc);
    this.universalBrowserAction.runCallback(this.row);
  }
}
