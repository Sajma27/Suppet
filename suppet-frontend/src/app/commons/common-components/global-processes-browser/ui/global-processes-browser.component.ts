import { Component, OnDestroy } from '@angular/core';
import { DashboardProcessesService } from "../core/dashboard-processes.service";
import { Subscription } from "rxjs";
import { DashboardProcess } from "../model/dashboard-process";

@Component({
  selector: 'app-dashboard-processes',
  templateUrl: './global-processes-browser.component.html',
  styleUrls: ['./global-processes-browser.component.scss']
})
export class GlobalProcessesBrowserComponent implements OnDestroy {

  processes: DashboardProcess[];
  columns: string[] = ['name', 'completed'];

  private processesSub: Subscription;

  constructor(private processesService: DashboardProcessesService) {
    this.processes = processesService.getProcesses();
    this.processesSub = processesService.getProcessesAsObservable()
      .subscribe((processes) => this.processes = processes);
  }

  removeProcess(idx: number) {
    this.processesService.removeProcess(idx);
  }

  removeCompletedProcesses() {
    this.processesService.removeCompletedProcesses();
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

}
