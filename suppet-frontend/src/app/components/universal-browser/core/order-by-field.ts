export class OrderByField {
  field: string;
  order: 'asc' | 'desc';

  constructor(field: string, orderBy: 'asc' | 'desc' = 'asc') {
    this.field = field;
    this.order = orderBy;
  }
}
