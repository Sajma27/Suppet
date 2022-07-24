import { Component, OnDestroy } from '@angular/core';
import { GlobalProcessesUtils } from "../core/global-processes.utils";
import { Subscription } from "rxjs";
import { GlobalProcess } from "../model/global-process";

@Component({
  selector: 'app-dashboard-processes',
  templateUrl: './global-processes-browser.component.html',
  styleUrls: ['./global-processes-browser.component.scss']
})
export class GlobalProcessesBrowserComponent implements OnDestroy {

  processes: GlobalProcess[];
  columns: string[] = ['name', 'completed', 'delete-action'];

  private processesSub: Subscription;

  constructor() {
    this.processes = [...GlobalProcessesUtils.getProcesses()];
    this.processesSub = GlobalProcessesUtils.getProcessesAsObservable()
      .subscribe((processes) => this.processes = [...processes]);
  }

  removeProcess(idx: number) {
    GlobalProcessesUtils.removeProcess(idx);
  }

  removeCompletedProcesses() {
    GlobalProcessesUtils.removeCompletedProcesses();
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

}
