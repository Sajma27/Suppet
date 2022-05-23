import { Observable } from "rxjs";

export class DashboardProcess {
  name: string;
  observable: Observable<any>;
  completed: boolean = false;

  constructor(name: string, observable: Observable<any>) {
    this.name = name;
    this.observable = observable;
  }
}
