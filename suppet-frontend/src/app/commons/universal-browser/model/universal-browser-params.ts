import { UniversalBrowserAdditionalParam } from "./universal-browser-additional-param";
import { QueryField } from "./query-field";
import { OrderByField } from "./order-by-field";

export class UniversalBrowserParams {
  query: QueryField[] = [];
  offset: number = 0;
  limit: number = 20;
  orderBy: OrderByField[] = [];
  additionalParams: UniversalBrowserAdditionalParam[] = [];
}
