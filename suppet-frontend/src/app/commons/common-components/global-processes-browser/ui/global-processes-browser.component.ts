import { Component, OnDestroy } from '@angular/core';
import { GlobalProcessesManager } from "../core/global-processes.manager";
import { Subscription } from "rxjs";
import { GlobalProcess } from "../model/global-process";
import { MatDialog } from "@angular/material/dialog";
import { ErrorMessageDialogComponent } from "../../error-message-dialog/ui/error-message-dialog.component";

@Component({
  selector: 'app-dashboard-processes',
  templateUrl: './global-processes-browser.component.html',
  styleUrls: ['./global-processes-browser.component.scss']
})
export class GlobalProcessesBrowserComponent implements OnDestroy {

  processes: GlobalProcess[];
  columns: string[] = ['name', 'completed', 'delete-action'];

  private processesSub: Subscription;

  constructor(private processesManager: GlobalProcessesManager, private dialog: MatDialog) {
    this.processes = [...this.processesManager.getProcesses()];
    this.processesSub = this.processesManager.getProcessesAsObservable()
      .subscribe((processes) => this.processes = [...processes]);
  }

  removeProcess(idx: number) {
    this.processesManager.removeProcess(idx);
  }

  removeCompletedProcesses() {
    this.processesManager.removeCompletedProcesses();
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

  onErrorClicked(errorMessage: string): void {
    this.dialog.open(ErrorMessageDialogComponent, {
      data: { errorMessage },
      panelClass: 'universal-browser-form'
    });
  }

}
