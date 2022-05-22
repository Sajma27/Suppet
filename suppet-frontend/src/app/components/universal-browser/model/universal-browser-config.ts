import { UniversalBrowserAction } from "./universal-browser-action";
import { UniversalBrowserParams } from "./universal-browser-params";

export class UniversalBrowserConfig {
  title: string = null;
  actions: UniversalBrowserAction[] = [];
  showPositionNumber: boolean = true;
  params: UniversalBrowserParams = new UniversalBrowserParams();
  addRefreshAction: boolean = true;
  clickableRows: boolean = true;
}
