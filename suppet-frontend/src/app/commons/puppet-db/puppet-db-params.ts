import { PuppetDbOrderByField } from "./puppet-db-order-by-field";
import { PuppetDbQueryField } from "./puppet-db-query-field";

export class PuppetDbParams {
  query: PuppetDbQueryField[] = [];
  offset: number = 0;
  limit: number = 20;
  orderBy: PuppetDbOrderByField[] = [];
  includeTotal: boolean = false;
}
