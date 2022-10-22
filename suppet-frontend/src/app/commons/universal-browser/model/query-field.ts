export const operators: string[] = ['=', '>=', '<=', '<', '>', '~'];
export const stringOperators: string[] = ['=', '~'];
export const numberOperators: string[] = operators;
export const dateOperators: string[] = operators;
export type operator = '=' | '>=' | '<=' | '<' | '>' | '~';

export class QueryField {
  op: operator = '=';
  field: string;
  value: string;
}
