import {
  BasicDashboardBrowserMenuComponent
} from "../basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";
import {
  AbstractUniversalBrowserCrudService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser-crud.service";
import {
  UniversalBrowserCrudConfig
} from "../../../../../commons/universal-browser/model/universal-browser-crud-config";

export abstract class BasicDashboardBrowserCrudMenuComponent<SERVICE extends AbstractUniversalBrowserCrudService<any>>
  extends BasicDashboardBrowserMenuComponent<SERVICE, UniversalBrowserCrudConfig> {

  protected constructor(browserService: SERVICE) {
    super(browserService);
  }

}
