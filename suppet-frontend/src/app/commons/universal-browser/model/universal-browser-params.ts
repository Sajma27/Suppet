import { QueryField } from "../core/query-field";
import { OrderByField } from "../core/order-by-field";
import { UniversalBrowserAdditionalParam } from "./universal-browser-additional-param";

export class UniversalBrowserParams {
  query: QueryField[] = [];
  offset: number = 0;
  limit: number = 20;
  orderBy: OrderByField[] = [];
  additionalParams: UniversalBrowserAdditionalParam[] = [];
}
