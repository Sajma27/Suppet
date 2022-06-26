import { Component } from '@angular/core';
import { CertsBrowserService } from '../core/certs-browser.service';
import { DashboardSignedCertsComponent } from "../signed-certs/dashboard-signed-certs.component";
import {
  UniversalBrowserAdditionalParam
} from "../../../../../commons/universal-browser/model/universal-browser-additional-param";

@Component({
  selector: 'app-dashboard-unsigned-certs',
  templateUrl: '../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardUnsignedCertsComponent extends DashboardSignedCertsComponent {

  constructor(service: CertsBrowserService) {
    super(service);
    this.browserConfig.params.additionalParams.push(new UniversalBrowserAdditionalParam('revoked', 'true'));
  }

  getTitle(): string {
    return 'Nieaktywne certyfikaty';
  }

  protected isRevokeActionVisible(): boolean {
    return false;
  }
}
