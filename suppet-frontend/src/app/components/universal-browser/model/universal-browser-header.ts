import { UniversalBrowserHeaderTypes } from "./universal-browser-header-types";

export class UniversalBrowserHeader {
  dataField: string;
  name: string;
  type: UniversalBrowserHeaderTypes;

  constructor(dataField: string, name: string, type: UniversalBrowserHeaderTypes = UniversalBrowserHeaderTypes.STRING) {
    this.dataField = dataField;
    this.name = name;
    this.type = type;
  }
}
