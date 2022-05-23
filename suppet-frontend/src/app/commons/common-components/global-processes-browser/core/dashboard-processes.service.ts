import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { DashboardProcess } from "../model/dashboard-process";

@Injectable({
  providedIn: 'root'
})
export class DashboardProcessesService {

  private static processes: DashboardProcess[] = [];
  private static processesChanged: Subject<DashboardProcess[]> = new Subject<DashboardProcess[]>();

  getProcesses(): DashboardProcess[] {
    return DashboardProcessesService.processes;
  }

  getProcessesAsObservable(): Observable<DashboardProcess[]> {
    return DashboardProcessesService.processesChanged.asObservable();
  }

  addProcess(name: string, sub: Observable<any>) {
    const process: DashboardProcess = new DashboardProcess(name, sub);
    sub.pipe(take(1)).subscribe(() => {
      process.completed = true;
    });
    DashboardProcessesService.processes.push(process);
    DashboardProcessesService.processesChanged.next(DashboardProcessesService.processes);
  }

  removeProcess(idx: number) {
    DashboardProcessesService.processes.splice(idx, 1);
    DashboardProcessesService.processesChanged.next(DashboardProcessesService.processes);
  }

  removeCompletedProcesses() {
    DashboardProcessesService.processes = DashboardProcessesService.processes.filter((process) => !process.completed);
    DashboardProcessesService.processesChanged.next(DashboardProcessesService.processes);
  }

}
