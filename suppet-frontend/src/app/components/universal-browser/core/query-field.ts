export type operator = '=' | '>=' | '<=' | '<' | '>' | 'in';

export class QueryField {
  op: operator;
  field: string;
  value: string;
}
