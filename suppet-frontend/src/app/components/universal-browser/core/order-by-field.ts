export class OrderByField {
  field: string;
  order: 'desc' | 'asc';

  constructor(field: string, orderBy: "desc" | "asc" = 'desc') {
    this.field = field;
    this.order = orderBy;
  }
}
