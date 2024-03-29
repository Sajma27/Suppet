import { Component, Inject, ViewChild } from '@angular/core';
import { UniversalBrowserComponent } from 'src/app/commons/universal-browser/ui/universal-browser.component';
import { UniversalBrowserConfig } from "../../../../../../commons/universal-browser/model/universal-browser-config";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClassesService } from '../../../dashboard-classes/core/classes.service';
import { AgentsService } from '../../core/agents.service';
import { ClassPickerParamsForm } from "./class-params-form/class-picker-params-form.component";
import { UniversalBrowserAction } from "../../../../../../commons/universal-browser/model/universal-browser-action";
import { UniversalBrowserRow } from "../../../../../../commons/universal-browser/model/universal-browser-row";
import { ClassDto } from "../../../dashboard-classes/model/class-dto";
import { AgentDto } from '../../model/agent-dto';
import _ from "lodash";
import {
  GlobalProcessesManager
} from "../../../../../../commons/common-components/global-processes-browser/core/global-processes.manager";

@Component({
  selector: 'app-class-picker',
  templateUrl: './class-picker.component.html',
  styleUrls: ['./class-picker.component.scss']
})
export class ClassPickerComponent {
  set classesAsString(value: string) {
    this._classesAsString = value;
  }

  get classesAsString(): string {
    return this._classesAsString;
  }

  @ViewChild('classesBrowser') protected classesBrowser: UniversalBrowserComponent;

  readonly agentDto: AgentDto;

  private _classesAsString: string = '';

  readonly browserConfig: UniversalBrowserConfig = new UniversalBrowserConfig();

  constructor(protected dialogRef: MatDialogRef<ClassPickerParamsForm>,
              @Inject(MAT_DIALOG_DATA) data: { agent: string },
              readonly classesService: ClassesService,
              private readonly classesAgents: AgentsService,
              private dialog: MatDialog,
              private processesManager: GlobalProcessesManager) {
    this.browserConfig.usingTotalRowCount = false;
    this.browserConfig.title = "Klasy";
    this.browserConfig.actions = [
      new UniversalBrowserAction('Dodaj', 'add',
        (row: UniversalBrowserRow) => this.pickClass(row),
        (row: UniversalBrowserRow) =>
          _.isNil(row) || !_.isNil(this.agentDto.classes.find((classDto) => classDto.name === row.data.name))
      ),
      new UniversalBrowserAction('Edytuj', 'edit',
        (row: UniversalBrowserRow) =>
          this.editClass(row, this.agentDto.classes.find((classDto: ClassDto) => classDto.name === row.data.name)),
        (row: UniversalBrowserRow) => {
          const existingClassAssignment: ClassDto = this.agentDto.classes.find((classDto: ClassDto) => classDto.name === row.data.name);
          return _.isNil(row) || _.isNil(existingClassAssignment) || existingClassAssignment.params?.length <= 0;
        }
      ),
      new UniversalBrowserAction('Usuń', 'delete',
        (row: UniversalBrowserRow) => this.removeClass(row),
        (row: UniversalBrowserRow) =>
          _.isNil(row) || _.isNil(this.agentDto.classes.find((classDto) => classDto.name === row.data.name))
      ),
      new UniversalBrowserAction('Usuń nieistniejące', 'delete_forever',
        () => this.removeAllNonexistent()),
      new UniversalBrowserAction('Usuń wszystkie', 'delete_forever',
        () => this.removeAllClasses())
    ];
    this.agentDto = new AgentDto();
    this.agentDto.name = data.agent;
    this.classesAgents.getAgentWithClasses(data.agent).subscribe(agent => {
      this.agentDto.classes = agent.classes;
      this.refreshClassesAsString();
    });
  }

  onSaveClick(): void {
    this.processesManager.runProcess('Przypisywanie klas agentowi ' + this.agentDto.name, this.classesAgents.updateAgentsClassesManifest(this.agentDto));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private pickClass(row: UniversalBrowserRow) {
    this.classesService.get(row).subscribe((classDto: ClassDto) => {
      if (classDto.params?.length > 0) {
        this.dialog.open(ClassPickerParamsForm, {
          data: { classDto: classDto, saveCallback: (classDto: ClassDto) => this.addClass(classDto) },
          panelClass: 'universal-browser-form',
          disableClose: true
        });
      } else {
        this.addClass(classDto);
      }
    });
  }

  private editClass(row: UniversalBrowserRow, classDto: ClassDto) {
    if (classDto.params?.length > 0) {
      this.classesService.get(row).subscribe((classDtoWithoutParamsValues: ClassDto) => {
        classDto.content = classDtoWithoutParamsValues.content;
        this.dialog.open(ClassPickerParamsForm, {
          data: { classDto: classDto, saveCallback: (classDto: ClassDto) => this.onEditClass(classDto) },
          panelClass: 'universal-browser-form',
          disableClose: true
        });
      });
    }
  }

  private addClass(classDto: ClassDto) {
    this.agentDto.classes.push(classDto);
    this.refreshClassesAsString();
  }

  private onEditClass(classDto: ClassDto) {
    const idx: number = this.agentDto.classes.findIndex(agentsClass => agentsClass.name === classDto.name);
    this.agentDto.classes[idx] = classDto;
    this.refreshClassesAsString();
  }

  private removeClass(row: UniversalBrowserRow) {
    this.agentDto.classes = this.agentDto.classes.filter(classDto => classDto.name !== row.data.name);
    this.refreshClassesAsString();
  }

  private removeAllNonexistent() {
    this.agentDto.classes = this.agentDto.classes.filter(
      classDto => !_.isNil(this.classesBrowser.data.find(classRow => classRow.name === classDto.name))
    );
    this.refreshClassesAsString();
  }

  private removeAllClasses() {
    this.agentDto.classes = [];
    this._classesAsString = '';
  }

  private refreshClassesAsString(): void {
    if (!_.isNil(this.agentDto)) {
      const classes: string[] = [];
      this.agentDto.classes.forEach(classDto => {
        let classAsString = classDto.name;
        if (classDto.params.length > 0) {
          classAsString += '(';
          const paramsValuesArray: string[] = [];
          classDto.params.forEach(param => {
            paramsValuesArray.push(param.name + ' => ' + param.value);
          });
          classAsString += paramsValuesArray.join(', ');
          classAsString += ')';
        }
        classes.push(classAsString);
      });
      this._classesAsString = classes.join(', \n');
    } else {
      this._classesAsString = '';
    }
  }
}
