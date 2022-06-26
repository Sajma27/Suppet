import { Component } from '@angular/core';
import { CertsBrowserService } from '../core/certs-browser.service';
import { DashboardSignedCertsComponent } from "../signed-certs/dashboard-signed-certs.component";
import {
  UniversalBrowserAdditionalParam
} from "../../../../../commons/universal-browser/model/universal-browser-additional-param";

@Component({
  selector: 'app-dashboard-requested-certs',
  templateUrl: '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardRequestedCertsComponent extends DashboardSignedCertsComponent {

  constructor(service: CertsBrowserService) {
    super(service);
    this.browserConfig.params.additionalParams.push(new UniversalBrowserAdditionalParam('requested', 'true'));
  }

  getTitle(): string {
    return 'Nowe certyfikaty';
  }

  protected isSignActionVisible(): boolean {
    return true;
  }

  protected isRevokeActionVisible(): boolean {
    return false;
  }
}
