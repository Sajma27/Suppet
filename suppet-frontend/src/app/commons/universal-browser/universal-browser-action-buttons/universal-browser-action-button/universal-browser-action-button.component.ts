import { Component, Input } from '@angular/core';
import { UniversalBrowserAction } from "../../model/universal-browser-action";
import { MatDialog } from "@angular/material/dialog";
import _ from "lodash";
import { UniversalBrowserFormConfigData } from "../../universal-browser-form/model/universal-browser-form-config-data";
import { UniversalBrowserRow } from "../../model/universal-browser-row";
import { Observable } from "rxjs";

@Component({
  selector: 'app-universal-browser-action-button',
  templateUrl: './universal-browser-action-button.component.html',
  styleUrls: ['./universal-browser-action-button.component.scss']
})
export class UniversalBrowserActionButtonComponent {

  @Input() row: any;
  @Input() universalBrowserAction: UniversalBrowserAction;
  @Input() disabled: boolean;
  @Input() getDataFromServer: (row: UniversalBrowserRow) => Observable<any>;
  @Input() refreshFunc: Function;

  constructor(private dialog: MatDialog) {
  }

  isDisabled(): boolean {
    return this.disabled || this.universalBrowserAction.isRowDisabled(this.row);
  }

  onClick(): void {
    this.universalBrowserAction.setBrowserRefreshFunc(this.refreshFunc);
    if (!_.isNil(this.universalBrowserAction.getFormComponent())) {
      if (this.universalBrowserAction.getWithFormsLoadingFromBackend()) {
        this.getDataFromServer(this.row).subscribe((dto: any) => {
          this.row.data = dto;
          this.openActionFormDialog();
        })
      } else {
        this.openActionFormDialog();
      }
    } else {
      this.universalBrowserAction.runCallback(this.row);
    }
  }

  private openActionFormDialog(): void {
    const configData: UniversalBrowserFormConfigData = new UniversalBrowserFormConfigData(
      this.row,
      this.universalBrowserAction.getFormMode(),
      this.universalBrowserAction.getDisabledFormFields(),
      this.getOnSaveCallback(),
      this.universalBrowserAction.getValidationMethod()
    );
    this.dialog.open(this.universalBrowserAction.getFormComponent(), {
      data: configData,
      panelClass: 'universal-browser-form',
      disableClose: true
    });
  }

  private getOnSaveCallback(): (dto: any) => void {
    return (dto: any) => {
      if (!_.isNil(dto)) {
        this.row = this.row || new UniversalBrowserRow(null, dto);
        this.row.data = dto;
        this.universalBrowserAction.runCallback(this.row);
      }
    }
  }
}
