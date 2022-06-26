import { Component, Input } from '@angular/core';
import { UniversalBrowserAction } from "../model/universal-browser-action";

@Component({
  selector: 'app-universal-browser-action-buttons',
  templateUrl: './universal-browser-action-buttons.component.html',
  styleUrls: ['./universal-browser-action-buttons.component.scss']
})
export class UniversalBrowserActionButtonsComponent {
  @Input() row: any;
  @Input() actions: UniversalBrowserAction[];
  @Input() disabled: boolean;
  @Input() refreshFunc: Function;
}
