import { UniversalBrowserConfig } from "../../../../commons/universal-browser/model/universal-browser-config";
import {
  AbstractUniversalBrowserService
} from "../../../../commons/universal-browser/core/abstract-universal-browser.service";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import _ from "lodash";

export abstract class BasicDashboardBrowserMenuComponent<SERVICE extends AbstractUniversalBrowserService> {

  showGlobalProcesses: boolean = true;
  showSubBrowser: boolean = false;

  readonly subBrowserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  protected readonly browserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  protected constructor(public readonly browserService: SERVICE, public readonly subBrowserService: AbstractUniversalBrowserService = null) {
    this.browserConfig.title = this.getTitle();
    this.subBrowserConfig.title = this.getSubBrowserTitle();
    this.browserConfig.actions = this.getActions();
    this.showSubBrowser = !_.isNil(subBrowserService);
  }

  getTitle(): string {
    return null;
  }

  getSubBrowserTitle(): string {
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
