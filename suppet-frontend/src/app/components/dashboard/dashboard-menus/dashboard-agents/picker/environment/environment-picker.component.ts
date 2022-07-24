import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UniversalBrowserConfig } from 'src/app/commons/universal-browser/model/universal-browser-config';
import { AgentDto } from '../../model/agent-dto';
import { EnvironmentsService } from "../../../dashboard-environments/core/environments-service";
import { AgentsService } from "../../core/agents.service";
import { UniversalBrowserRow } from "../../../../../../commons/universal-browser/model/universal-browser-row";
import _ from "lodash";
import { UniversalBrowserAction } from "../../../../../../commons/universal-browser/model/universal-browser-action";
import {
  GlobalProcessesUtils
} from "../../../../../../commons/common-components/global-processes-browser/core/global-processes.utils";
import { tap } from "rxjs/operators";


@Component({
  selector: 'app-environment-picker',
  templateUrl: './environment-picker.component.html',
  styleUrls: ['./environment-picker.component.scss']
})
export class EnvironmentPickerComponent {

  readonly agentDto: AgentDto;
  readonly browserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  private readonly parentBrowserRefreshFunc: () => void;

  constructor(protected dialogRef: MatDialogRef<EnvironmentPickerComponent>,
              @Inject(MAT_DIALOG_DATA) data: { agent: string, environment: string, parentBrowserRefreshFunc: () => void },
              readonly environmentsService: EnvironmentsService,
              private readonly agentsService: AgentsService) {
    this.dialogRef = dialogRef;
    this.browserConfig.usingTotalRowCount = false;
    this.browserConfig.title = "Środowiska";
    this.browserConfig.actions = [
      new UniversalBrowserAction('Wybierz', 'swipe_up',
        (row: UniversalBrowserRow) => this.pickEnvironment(row),
        (row: UniversalBrowserRow) => _.isNil(row) || row.data.name === this.agentDto.environment
      )
    ];
    this.agentDto = new AgentDto();
    this.agentDto.name = data.agent;
    this.agentDto.environment = data.environment;
    this.parentBrowserRefreshFunc = data.parentBrowserRefreshFunc;
  }

  onSaveClick(): void {
    GlobalProcessesUtils.runProcess('Zmiana środowiska "' + this.agentDto.name + '" na: ' + this.agentDto.environment,
      this.agentsService.changeAgentsEnvironment(this.agentDto.name, this.agentDto.environment).pipe(
        tap(() => this.parentBrowserRefreshFunc())
      ));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private pickEnvironment(row: UniversalBrowserRow): void {
    this.agentDto.environment = row.data.name;
  }
}
