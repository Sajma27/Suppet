import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { GlobalProcess } from "../model/global-process";
import { GlobalProcessBackendResponse } from "../model/global-process-backend-response";

export class GlobalProcessesUtils {

  private static processes: GlobalProcess[] = [];
  private static processesChanged: Subject<GlobalProcess[]> = new Subject<GlobalProcess[]>();

  static runProcess(name: string, sub: Observable<GlobalProcessBackendResponse>) {
    const process: GlobalProcess = new GlobalProcess(name, sub);
    sub.pipe(take(1)).subscribe((response: GlobalProcessBackendResponse) => {
      process.completed = response.result === 0;
      process.error = !process.completed;
      process.errorMessage = response.errorMessage;
    }, () => {
      process.error = true;
      process.errorMessage = 'Błąd';
    });
    GlobalProcessesUtils.processes.push(process);
    GlobalProcessesUtils.processesChanged.next(GlobalProcessesUtils.processes);
  }

  static getProcesses(): GlobalProcess[] {
    return GlobalProcessesUtils.processes;
  }

  static getProcessesAsObservable(): Observable<GlobalProcess[]> {
    return GlobalProcessesUtils.processesChanged.asObservable();
  }

  static removeProcess(idx: number) {
    GlobalProcessesUtils.processes.splice(idx, 1);
    GlobalProcessesUtils.processesChanged.next(GlobalProcessesUtils.processes);
  }

  static removeCompletedProcesses() {
    GlobalProcessesUtils.processes = GlobalProcessesUtils.processes.filter((process) => !process.completed && !process.error);
    GlobalProcessesUtils.processesChanged.next(GlobalProcessesUtils.processes);
  }

}
