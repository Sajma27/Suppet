import { Observable } from "rxjs";

export class GlobalProcess {
  name: string;
  observable: Observable<boolean>;
  completed: boolean = false;
  error: boolean = false;
  errorMessage: string = null;

  constructor(name: string, observable: Observable<any>) {
    this.name = name;
    this.observable = observable;
  }
}
