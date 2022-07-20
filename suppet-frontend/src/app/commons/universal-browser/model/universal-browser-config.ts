import { UniversalBrowserAction } from "./universal-browser-action";
import { UniversalBrowserParams } from "./universal-browser-params";

export class UniversalBrowserConfig {
  title: string = null;
  noDataMessage: string = 'Brak danych';
  actions: UniversalBrowserAction[] = [];
  showPositionNumber: boolean = true;
  params: UniversalBrowserParams = new UniversalBrowserParams();
  addRefreshAction: boolean = true;
  clickableRows: boolean = true;
  browserDisabled: boolean = false;
  filteringDisabled: boolean = false;
  sortingDisabled: boolean = false;
  showActionButtons: boolean = true;
  usingTotalRowCount: boolean = true;
  environmentFieldName: string = 'environment';
}
