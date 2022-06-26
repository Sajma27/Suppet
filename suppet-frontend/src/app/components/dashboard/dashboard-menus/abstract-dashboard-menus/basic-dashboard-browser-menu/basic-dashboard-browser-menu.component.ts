import { UniversalBrowserConfig } from "../../../../../commons/universal-browser/model/universal-browser-config";
import {
  AbstractUniversalBrowserService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser.service";
import { UniversalBrowserAction } from "../../../../../commons/universal-browser/model/universal-browser-action";
import _ from "lodash";

export abstract class BasicDashboardBrowserMenuComponent<SERVICE extends AbstractUniversalBrowserService, CONFIG extends UniversalBrowserConfig = UniversalBrowserConfig> {

  showGlobalProcesses: boolean = true;
  showSubBrowser: boolean = false;

  readonly subBrowserConfig: CONFIG = new UniversalBrowserConfig() as CONFIG;

  protected readonly browserConfig: CONFIG = new UniversalBrowserConfig() as CONFIG;

  protected constructor(public readonly browserService: SERVICE, public readonly subBrowserService: AbstractUniversalBrowserService = null) {
    this.initProperties();
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

  getBrowserConfig(): CONFIG {
    return this.browserConfig;
  }

  protected initProperties(): void {
    this.browserConfig.title = this.getTitle();
    this.subBrowserConfig.title = this.getSubBrowserTitle();
    this.browserConfig.actions = [...this.browserConfig.actions, ...this.getActions()];
  }
}
