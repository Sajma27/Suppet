import { Component, OnInit } from '@angular/core';
import { UniversalBrowserConfig } from "../../../universal-browser/model/universal-browser-config";
import { CertsBrowserService } from "./core/certs-browser.service";
import { UniversalBrowserAdditionalParam } from "../../../universal-browser/model/universal-browser-additional-param";

@Component({
  selector: 'app-dashboard-certs',
  templateUrl: './dashboard-certs.component.html',
  styleUrls: ['./dashboard-certs.component.scss']
})
export class DashboardCertsComponent implements OnInit {

  private signedCertsBrowserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();
  private revokedCertsBrowserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  constructor(public readonly service: CertsBrowserService) {
    this.signedCertsBrowserConfig.title = 'Aktywne certyfikaty';
    this.revokedCertsBrowserConfig.title = 'Nieaktywne certyfikaty';
    this.revokedCertsBrowserConfig.params.additionalParams.push(new UniversalBrowserAdditionalParam('revoked', 'true'));
  }

  ngOnInit(): void {
  }

  getSignedCertsBrowserConfig(): UniversalBrowserConfig {
    return this.signedCertsBrowserConfig;
  }

  getRevokedCertsBrowserConfig(): UniversalBrowserConfig {
    return this.revokedCertsBrowserConfig;
  }
}
