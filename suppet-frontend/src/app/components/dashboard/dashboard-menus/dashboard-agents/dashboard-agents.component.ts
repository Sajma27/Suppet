import { Component, OnInit, ViewChild } from '@angular/core';
import { PuppetDbNodesService } from "../../../../commons/puppet-db/nodes/puppet-db-nodes.service";
import {
  BasicDashboardBrowserMenuComponent
} from "../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component";
import { UniversalBrowserAction } from "../../../../commons/universal-browser/model/universal-browser-action";
import { AgentsService } from "./core/agents.service";
import { UniversalBrowserRow } from "../../../../commons/universal-browser/model/universal-browser-row";
import {
  UniversalBrowserAsyncAction
} from "../../../../commons/universal-browser/model/universal-browser-async-action";
import { PuppetDbFactsService } from "../../../../commons/puppet-db/facts/puppet-db-facts.service";
import { QueryField } from "../../../../commons/universal-browser/model/query-field";
import { UniversalBrowserComponent } from "../../../../commons/universal-browser/ui/universal-browser.component";
import { MatDialog } from "@angular/material/dialog";
import _ from "lodash";
import { DashboardAgentsConfigForm } from "./form/dashboard-agents-config-form";
import {
  UniversalBrowserFormMode
} from "../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-mode";
import {
  UniversalBrowserFormConfigData
} from "../../../../commons/universal-browser/universal-browser-form/model/universal-browser-form-config-data";
import { AgentDto } from "./model/agent-dto";
import { AgentsConfig } from "./model/agents-config";
import {
  GlobalProcessesManager
} from "../../../../commons/common-components/global-processes-browser/core/global-processes.manager";
import { map, tap } from "rxjs/operators";
import {
  GlobalProcessBackendResponse
} from "../../../../commons/common-components/global-processes-browser/model/global-process-backend-response";
import { EnvironmentPickerComponent } from "./picker/environment/environment-picker.component";
import { ClassPickerComponent } from "./picker/class/class-picker.component";

@Component({
  selector: 'app-dashboard-agents',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardAgentsComponent extends BasicDashboardBrowserMenuComponent<PuppetDbNodesService> implements OnInit {
  private static NON_EDITABLE_AGENTS: string[] = ['puppet-master.home', 'puppet-db.home'];

  @ViewChild('browser') protected browser: UniversalBrowserComponent;
  @ViewChild('subBrowser') protected subBrowser: UniversalBrowserComponent;

  constructor(service: PuppetDbNodesService,
              subBrowserService: PuppetDbFactsService,
              processesManager: GlobalProcessesManager,
              private agentsService: AgentsService,
              private dialog: MatDialog) {
    super(service, processesManager, subBrowserService);
    this.subBrowserConfig.params.limit = 50;
    this.browserConfig.environmentFieldName = 'catalog_environment';
  }

  ngOnInit(): void {
    this.showSubBrowser = false;
  }

  getTitle(): string {
    return 'Agenci';
  }

  getDescription(): string {
    return "Panel pozwala na konfigurowanie, aktualizowanie oraz podgląd faktów agentów.";
  }

  getSubBrowserTitle(): string {
    return 'Fakty';
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAction('Konfiguruj', 'settings',
        (row: UniversalBrowserRow) => this.getAgentsConfigAndOpenForm(row),
        (row: UniversalBrowserRow) => _.isNil(row) || DashboardAgentsComponent.NON_EDITABLE_AGENTS.includes(row.data.certname)),
      new UniversalBrowserAction('Zmień środowisko', 'park',
        (row: UniversalBrowserRow) => this.changeEnvironment(row),
        (row: UniversalBrowserRow) => _.isNil(row) || DashboardAgentsComponent.NON_EDITABLE_AGENTS.includes(row.data.certname)),
      new UniversalBrowserAction('Przypisz klasy', 'class',
        (row: UniversalBrowserRow) => this.assignClasses(row),
        (row: UniversalBrowserRow) => _.isNil(row) || DashboardAgentsComponent.NON_EDITABLE_AGENTS.includes(row.data.certname)),
      new UniversalBrowserAsyncAction(this.processesManager, 'Aktualizuj', 'update',
        (row: UniversalBrowserRow) => this.agentsService.updateAgent(row.data.certname),
        (row: UniversalBrowserRow) => !row,
        (row: UniversalBrowserRow) => 'Aktualizacja agenta: ' + row.data.certname, true),
      new UniversalBrowserAction('Pokaż fakty', 'category',
        (row: UniversalBrowserRow) => this.onShowFacts(row), true)
    ];
  }

  private getAgentsConfigAndOpenForm(row: UniversalBrowserRow): void {
    const getAgentsConfigAndOpenFormObservable = this.agentsService
      .getAgentWithConfig(row.data.certname)
      .pipe(
        map((agent: AgentDto) => {
          this.openConfigForm(agent, row);
          return new GlobalProcessBackendResponse(0);
        })
      );
    this.processesManager.runProcess("Pobieranie konfiguracji agenta: " + row.data.certname, getAgentsConfigAndOpenFormObservable);
  }

  private openConfigForm(agent: AgentDto, row: UniversalBrowserRow): void {
    row.data.environment = !_.isNil(agent.config.environment) ? agent.config.environment : row.data[this.browserConfig.environmentFieldName];
    row.data.runinterval = agent.config.runinterval;
    const configData: UniversalBrowserFormConfigData = new UniversalBrowserFormConfigData(
      row,
      UniversalBrowserFormMode.EDIT,
      [],
      (config: AgentsConfig) => {
        agent.config = config;
        this.processesManager.runProcess(
          'Aktualizacja konfiguracji agenta: ' + agent.name,
          this.agentsService.setAgentsConfig(agent).pipe(tap(() => this.browser?.refresh()))
        );
      },
      null
    );
    this.dialog.open(DashboardAgentsConfigForm, {
      data: configData,
      panelClass: 'universal-browser-form',
      disableClose: true
    });
  }

  private changeEnvironment(row: UniversalBrowserRow): void {
    this.dialog.open(EnvironmentPickerComponent, {
      data: {
        agent: row.data.certname,
        environment: row.data[this.browserConfig.environmentFieldName],
        parentBrowserRefreshFunc: () => this.browser.refresh()
      },
      panelClass: 'universal-browser-form',
      disableClose: true
    });
  }

  private assignClasses(row: UniversalBrowserRow): void {
    this.dialog.open(ClassPickerComponent, {
      data: { agent: row.data.certname },
      panelClass: 'universal-browser-form',
      disableClose: true
    });
  }

  private onShowFacts(row: UniversalBrowserRow): void {
    const query: QueryField = new QueryField();
    query.op = '=';
    query.field = 'certname'
    query.value = row.data.certname;
    this.subBrowserConfig.params.query = [query];
    if (this.showSubBrowser) {
      this.subBrowser.refresh();
      document.getElementById('subBrowser').scrollIntoView({ behavior: "smooth" });
    } else {
      this.showSubBrowser = true;
      setTimeout(() => document.getElementById('subBrowser').scrollIntoView({ behavior: "smooth" }), 20);

    }
  }
}
