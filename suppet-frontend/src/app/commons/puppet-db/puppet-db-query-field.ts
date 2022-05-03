export type operator = '=' | '>=' | '<=' | '<' | '>' | 'in';

export class PuppetDbQueryField {
  op: operator;
  field: string;
  value: string;
}
