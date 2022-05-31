import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { GlobalProcess } from "../model/global-process";

export class GlobalProcessesService {

  private static processes: GlobalProcess[] = [];
  private static processesChanged: Subject<GlobalProcess[]> = new Subject<GlobalProcess[]>();

  static runProcess(name: string, sub: Observable<boolean>) {
    const process: GlobalProcess = new GlobalProcess(name, sub);
    sub.pipe(take(1)).subscribe((result: boolean) => {
      process.completed = result;
      process.error = !result;
    }, () => {
      process.error = true;
    });
    GlobalProcessesService.processes.push(process);
    GlobalProcessesService.processesChanged.next(GlobalProcessesService.processes);
  }

  static getProcesses(): GlobalProcess[] {
    return GlobalProcessesService.processes;
  }

  static getProcessesAsObservable(): Observable<GlobalProcess[]> {
    return GlobalProcessesService.processesChanged.asObservable();
  }

  static removeProcess(idx: number) {
    GlobalProcessesService.processes.splice(idx, 1);
    GlobalProcessesService.processesChanged.next(GlobalProcessesService.processes);
  }

  static removeCompletedProcesses() {
    GlobalProcessesService.processes = GlobalProcessesService.processes.filter((process) => !process.completed && !process.error);
    GlobalProcessesService.processesChanged.next(GlobalProcessesService.processes);
  }

}
