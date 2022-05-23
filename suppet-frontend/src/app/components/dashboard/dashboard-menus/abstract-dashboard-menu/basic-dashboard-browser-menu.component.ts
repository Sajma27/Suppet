import { Component } from '@angular/core';
import { UniversalBrowserConfig } from "../../../../commons/universal-browser/model/universal-browser-config";
import {
  AbstractUniversalBrowserService
} from "../../../../commons/universal-browser/core/abstract-universal-browser.service";

@Component({
  templateUrl: './basic-dashboard-browser-menu.component.html',
  styleUrls: ['./basic-dashboard-browser-menu.component.scss']
})
export class BasicDashboardBrowserMenuComponent {

  showGlobalProcesses: boolean = true;

  protected browserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  constructor(public readonly browserService: AbstractUniversalBrowserService) {
    this.browserConfig.title = this.getTitle();
  }

  getTitle(): string {
    return null;
  }

  getDescription(): string {
    return null;
  }

  getBrowserConfig(): UniversalBrowserConfig {
    return this.browserConfig;
  }
}
