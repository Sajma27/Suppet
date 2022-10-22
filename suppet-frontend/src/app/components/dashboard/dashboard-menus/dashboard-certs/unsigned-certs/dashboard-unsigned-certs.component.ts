import { Component } from '@angular/core';
import { CertsBrowserService } from '../core/certs-browser.service';
import {
  UniversalBrowserAdditionalParam
} from "../../../../../commons/universal-browser/model/universal-browser-additional-param";
import {
  BasicDashboardBrowserMenuComponent
} from "../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../../commons/universal-browser/model/universal-browser-action";
import {
  UniversalBrowserAsyncAction
} from "../../../../../commons/universal-browser/model/universal-browser-async-action";
import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";
import _ from "lodash";
import { DashboardCertsUtils } from "../utils/dashboard-certs-utils";
import {
  GlobalProcessesManager
} from "../../../../../commons/common-components/global-processes-browser/core/global-processes.manager";

@Component({
  selector: 'app-dashboard-unsigned-certs',
  templateUrl: '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardUnsignedCertsComponent extends BasicDashboardBrowserMenuComponent<CertsBrowserService> {

  constructor(service: CertsBrowserService,
              processesManager: GlobalProcessesManager) {
    super(service, processesManager);
    this.browserConfig.params.additionalParams.push(new UniversalBrowserAdditionalParam('revoked', 'true'));
  }

  getTitle(): string {
    return 'Nieaktywne certyfikaty';
  }

  getDescription(): string {
    return "Panel pozwala na czyszczenie dezaktywowanych ceryfikatów.";
  }

  getActions(): UniversalBrowserAction[] {
    const cleanAction = new UniversalBrowserAsyncAction(this.processesManager, 'Wyczyść', 'delete',
      (row: UniversalBrowserRow) => this.browserService.cleanCert(row.data.name),
      (row: UniversalBrowserRow) => _.isNil(row) || DashboardCertsUtils.isReadonlyRow(row),
      (row: UniversalBrowserRow) => 'Usuwanie certyfikatu: ' + row.data.name, true);

    return [cleanAction];
  }
}
