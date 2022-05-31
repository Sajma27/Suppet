import { Component, OnDestroy } from '@angular/core';
import { GlobalProcessesService } from "../core/global-processes.service";
import { Subscription } from "rxjs";
import { GlobalProcess } from "../model/global-process";

@Component({
  selector: 'app-dashboard-processes',
  templateUrl: './global-processes-browser.component.html',
  styleUrls: ['./global-processes-browser.component.scss']
})
export class GlobalProcessesBrowserComponent implements OnDestroy {

  processes: GlobalProcess[];
  columns: string[] = ['name', 'completed'];

  private processesSub: Subscription;

  constructor() {
    this.processes = [...GlobalProcessesService.getProcesses()];
    this.processesSub = GlobalProcessesService.getProcessesAsObservable()
      .subscribe((processes) => this.processes = [...processes]);
  }

  removeProcess(idx: number) {
    GlobalProcessesService.removeProcess(idx);
  }

  removeCompletedProcesses() {
    GlobalProcessesService.removeCompletedProcesses();
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

}
