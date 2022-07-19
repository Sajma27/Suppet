import { Component } from '@angular/core';
import {
  BasicDashboardBrowserMenuComponent
} from '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component';
import { CertsBrowserService } from '../core/certs-browser.service';
import { UniversalBrowserAction } from "../../../../../commons/universal-browser/model/universal-browser-action";
import {
  UniversalBrowserAsyncAction
} from "../../../../../commons/universal-browser/model/universal-browser-async-action";
import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";
import { CertStates } from "../model/cert-states";

@Component({
  selector: 'app-dashboard-signed-certs',
  templateUrl: '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardSignedCertsComponent extends BasicDashboardBrowserMenuComponent<CertsBrowserService> {

  constructor(service: CertsBrowserService) {
    super(service);
    this.browserConfig.sortingDisabled = true;
    this.browserConfig.filteringDisabled = true;
    this.browserConfig.usingTotalRowCount = false;
  }

  getTitle(): string {
    return 'Aktywne certyfikaty';
  }

  getActions(): UniversalBrowserAction[] {
    const actions: UniversalBrowserAction[] = [];

    if (this.isSignActionVisible()) {
      const signAction = new UniversalBrowserAsyncAction('Podpisz', 'check_circle',
        (row: UniversalBrowserRow) => this.browserService.signCert(row.data.name),
        (row: UniversalBrowserRow) => row.data.state === CertStates.SIGNED,
        (row: UniversalBrowserRow) => 'Aktywacja certyfikatu: ' + row.data.name, true);
      actions.push(signAction);
    }

    if (this.isRevokeActionVisible()) {
      const revokeAction = new UniversalBrowserAsyncAction('Dezaktywuj', 'unpublished',
        (row: UniversalBrowserRow) => this.browserService.revokeCert(row.data.name),
        (row: UniversalBrowserRow) => row.data.state === CertStates.REVOKED,
        (row: UniversalBrowserRow) => 'Dezaktywacja certyfikatu: ' + row.data.name, true);
      actions.push(revokeAction);
    }

    if (this.isCleanActionVisible()) {
      const cleanAction = new UniversalBrowserAsyncAction('Wyczyść', 'delete',
        (row: UniversalBrowserRow) => this.browserService.cleanCert(row.data.name),
        true, (row: UniversalBrowserRow) => 'Usuwanie certyfikatu: ' + row.data.name, true);
      actions.push(cleanAction);
    }

    return actions;
  }

  protected isSignActionVisible(): boolean {
    return false;
  }

  protected isRevokeActionVisible(): boolean {
    return true;
  }

  protected isCleanActionVisible(): boolean {
    return true;
  }

}
