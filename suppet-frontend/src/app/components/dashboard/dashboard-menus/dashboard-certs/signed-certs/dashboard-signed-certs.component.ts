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
import _ from "lodash";
import { AgentsService } from "../../dashboard-agents/core/agents.service";
import {
  ActiveEnvironmentManager
} from "../../../../../commons/common-components/active-environment-manager/active-environment-manager.service";
import { DashboardCertsUtils } from "../utils/dashboard-certs-utils";

@Component({
  selector: 'app-dashboard-signed-certs',
  templateUrl: '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardSignedCertsComponent extends BasicDashboardBrowserMenuComponent<CertsBrowserService> {

  constructor(service: CertsBrowserService,
              private agentsService: AgentsService,
              private environmentManager: ActiveEnvironmentManager) {
    super(service);
    this.browserConfig.sortingDisabled = true;
    this.browserConfig.filteringDisabled = true;
    this.browserConfig.usingTotalRowCount = false;
  }

  getTitle(): string {
    return 'Aktywne certyfikaty';
  }

  getDescription(): string {
    return "Panel pozwala na przypisywanie agentów do aktywnego środowiska oraz deaktywację i czyszczenie podpisanych ceryfikatów.";
  }

  getActions(): UniversalBrowserAction[] {
    const actions: UniversalBrowserAction[] = [];

    const assignToEnv = new UniversalBrowserAsyncAction('Przypisz do akt. środowiska', 'park',
      (row: UniversalBrowserRow) => this.agentsService.changeAgentsEnvironment(row.data.name, this.environmentManager.activeEnvironment),
      (row: UniversalBrowserRow) => _.isNil(row) || !this.environmentManager.hasActiveEnvironment() || DashboardCertsUtils.isReadonlyRow(row),
      (row: UniversalBrowserRow) => 'Przypisywanie do akt. środowiska: ' + row.data.name, true)
    actions.push(assignToEnv);

    const revokeAction = new UniversalBrowserAsyncAction('Dezaktywuj', 'unpublished',
      (row: UniversalBrowserRow) => this.browserService.revokeCert(row.data.name),
      (row: UniversalBrowserRow) => _.isNil(row) || row.data.state === CertStates.REVOKED || DashboardCertsUtils.isReadonlyRow(row),
      (row: UniversalBrowserRow) => 'Dezaktywacja certyfikatu: ' + row.data.name, true);
    actions.push(revokeAction);

    const cleanAction = new UniversalBrowserAsyncAction('Wyczyść', 'delete',
      (row: UniversalBrowserRow) => this.browserService.cleanCert(row.data.name),
      (row: UniversalBrowserRow) => _.isNil(row) || DashboardCertsUtils.isReadonlyRow(row),
      (row: UniversalBrowserRow) => 'Usuwanie certyfikatu: ' + row.data.name, true);
    actions.push(cleanAction);

    return actions;
  }
}
