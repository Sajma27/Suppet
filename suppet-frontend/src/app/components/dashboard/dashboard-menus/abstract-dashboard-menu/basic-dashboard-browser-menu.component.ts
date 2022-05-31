import { Component } from '@angular/core';
import { UniversalBrowserConfig } from "../../../../commons/universal-browser/model/universal-browser-config";
import {
  AbstractUniversalBrowserService
} from "../../../../commons/universal-browser/core/abstract-universal-browser.service";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";

@Component({
  templateUrl: './basic-dashboard-browser-menu.component.html',
  styleUrls: ['./basic-dashboard-browser-menu.component.scss']
})
export class BasicDashboardBrowserMenuComponent {

  showGlobalProcesses: boolean = true;

  protected readonly browserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  constructor(public readonly browserService: AbstractUniversalBrowserService) {
    this.browserConfig.title = this.getTitle();
    this.browserConfig.actions = this.getActions();
  }

  getTitle(): string {
    return null;
  }

  getDescription(): string {
    return null;
  }

  getActions(): UniversalBrowserAction[] {
    return [];
  }

  getBrowserConfig(): UniversalBrowserConfig {
    return this.browserConfig;
  }
}
