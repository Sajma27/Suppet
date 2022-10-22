import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { GlobalProcess } from "../model/global-process";
import { GlobalProcessBackendResponse } from "../model/global-process-backend-response";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalProcessesManager {

  private processes: GlobalProcess[] = [];
  private processesChanged: Subject<GlobalProcess[]> = new Subject<GlobalProcess[]>();

  runProcess(name: string, sub: Observable<GlobalProcessBackendResponse>): void {
    const process: GlobalProcess = new GlobalProcess(name, sub);
    sub.pipe(take(1)).subscribe((response: GlobalProcessBackendResponse) => {
      process.completed = response.result === 0;
      process.error = !process.completed;
      process.errorMessage = response.errorMessage;
    }, () => {
      process.error = true;
      process.errorMessage = 'Błąd';
    });
    this.processes = [process, ...this.processes];
    this.processesChanged.next(this.processes);
  }

  getProcesses(): GlobalProcess[] {
    return this.processes;
  }

  getProcessesAsObservable(): Observable<GlobalProcess[]> {
    return this.processesChanged.asObservable();
  }

  removeProcess(idx: number) {
    this.processes.splice(idx, 1);
    this.processesChanged.next(this.processes);
  }

  removeCompletedProcesses() {
    this.processes = this.processes.filter((process) => !process.completed && !process.error);
    this.processesChanged.next(this.processes);
  }

}
