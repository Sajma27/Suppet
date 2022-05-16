import { OrderByField } from "../../../commons/puppet-db/order-by-field";
import { QueryField } from "../../../commons/puppet-db/query-field";

export class UniversalBrowserParams {
  query: QueryField[] = [];
  offset: number = 0;
  limit: number = 20;
  orderBy: OrderByField[] = [];
  additionalParams: Map<string, string> = new Map<string, string>();
}
