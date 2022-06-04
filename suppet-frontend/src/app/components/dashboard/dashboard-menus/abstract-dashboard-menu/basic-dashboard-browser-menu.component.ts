import { UniversalBrowserConfig } from "../../../../commons/universal-browser/model/universal-browser-config";
import {
  AbstractUniversalBrowserService
} from "../../../../commons/universal-browser/core/abstract-universal-browser.service";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";

export abstract class BasicDashboardBrowserMenuComponent<SERVICE extends AbstractUniversalBrowserService> {

  showGlobalProcesses: boolean = true;

  protected readonly browserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  protected constructor(public readonly browserService: SERVICE) {
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
