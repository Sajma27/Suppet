import { Component, Input } from '@angular/core';
import { UniversalBrowserAction } from "../model/universal-browser-action";
import { UniversalBrowserRow } from "../model/universal-browser-row";
import { Observable } from "rxjs";

@Component({
  selector: 'app-universal-browser-action-buttons',
  templateUrl: './universal-browser-action-buttons.component.html',
  styleUrls: ['./universal-browser-action-buttons.component.scss']
})
export class UniversalBrowserActionButtonsComponent {
  @Input() row: any;
  @Input() actions: UniversalBrowserAction[];
  @Input() disabled: boolean;
  @Input() getDataFromServer: (row: UniversalBrowserRow) => Observable<any>;
  @Input() refreshFunc: Function;
}
