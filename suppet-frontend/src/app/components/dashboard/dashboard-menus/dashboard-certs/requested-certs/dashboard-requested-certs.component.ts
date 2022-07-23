import { Component } from '@angular/core';
import { CertsBrowserService } from '../core/certs-browser.service';
import {
  UniversalBrowserAdditionalParam
} from "../../../../../commons/universal-browser/model/universal-browser-additional-param";
import { UniversalBrowserAction } from "../../../../../commons/universal-browser/model/universal-browser-action";
import {
  UniversalBrowserAsyncAction
} from "../../../../../commons/universal-browser/model/universal-browser-async-action";
import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";
import {
  UniversalBrowserFormMode
} from "../../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-mode";
import { AgentsService } from "../../dashboard-agents/core/agents.service";
import { DashboardNewCertForm } from "./new-cert-form/dashboard-new-cert-form";
import _ from "lodash";
import { CertStates } from "../model/cert-states";
import { DashboardCertsUtils } from "../utils/dashboard-certs-utils";
import {
  BasicDashboardBrowserMenuComponent
} from "../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";

@Component({
  selector: 'app-dashboard-requested-certs',
  templateUrl: '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardRequestedCertsComponent extends BasicDashboardBrowserMenuComponent<CertsBrowserService> {

  constructor(service: CertsBrowserService,
              private agentsService: AgentsService) {
    super(service);
    this.browserConfig.params.additionalParams.push(new UniversalBrowserAdditionalParam('requested', 'true'));
  }

  getTitle(): string {
    return 'Nowe certyfikaty';
  }

  getActions(): UniversalBrowserAction[] {
    const addNewCertAction: UniversalBrowserAsyncAction = new UniversalBrowserAsyncAction(
      'Dodaj nowy certyfikat', 'add', (row: UniversalBrowserRow) => this.agentsService.updateAgent(row.data.name),
      false, () => this.getTitle() + ': Dodawanie certyfikatu', true,
      DashboardNewCertForm, UniversalBrowserFormMode.NEW);

    const signAction = new UniversalBrowserAsyncAction('Podpisz', 'check_circle',
      (row: UniversalBrowserRow) => this.browserService.signCert(row.data.name),
      (row: UniversalBrowserRow) => _.isNil(row) || row.data.state === CertStates.SIGNED || DashboardCertsUtils.isReadonlyRow(row),
      (row: UniversalBrowserRow) => 'Aktywacja certyfikatu: ' + row.data.name, true);

    return [addNewCertAction, signAction];
  }
}
