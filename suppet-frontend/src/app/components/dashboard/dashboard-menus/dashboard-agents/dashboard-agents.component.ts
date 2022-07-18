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
import { QueryField } from "../../../../commons/universal-browser/core/query-field";
import { UniversalBrowserComponent } from "../../../../commons/universal-browser/ui/universal-browser.component";
import { MatDialog } from "@angular/material/dialog";
import { ClassPickerComponent } from "../dashboard-classes/picker/class-picker.component";
import _ from "lodash";

@Component({
  selector: 'app-dashboard-agents',
  templateUrl: '../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.html',
  styleUrls: ['../abstract-dashboard-menus/basic-dashboard-browser-menu/basic-dashboard-browser-menu.component.scss']
})
export class DashboardAgentsComponent extends BasicDashboardBrowserMenuComponent<PuppetDbNodesService> implements OnInit {
  private static NON_EDITABLE_AGENTS: string[] = ['puppet-master.home', 'puppet-db.home'];

  @ViewChild('subBrowser') protected subBrowser: UniversalBrowserComponent;

  constructor(service: PuppetDbNodesService,
              subBrowserService: PuppetDbFactsService,
              private agentsService: AgentsService,
              private dialog: MatDialog) {
    super(service, subBrowserService);
    this.subBrowserConfig.params.limit = 50;
  }

  ngOnInit(): void {
    this.showSubBrowser = false;
  }

  getTitle(): string {
    return 'Agenci';
  }

  getSubBrowserTitle(): string {
    return 'Fakty';
  }

  getActions(): UniversalBrowserAction[] {
    return [
      new UniversalBrowserAction('Przypisz klasy', 'class',
        (row: UniversalBrowserRow) => this.assignClasses(row),
        (row: UniversalBrowserRow) => _.isNil(row) || DashboardAgentsComponent.NON_EDITABLE_AGENTS.includes(row.data.certname)),
      new UniversalBrowserAsyncAction('Aktualizuj', 'update',
        (row: UniversalBrowserRow) => this.agentsService.updateAgent(row.data.certname),
        (row: UniversalBrowserRow) => !row,
        (row: UniversalBrowserRow) => 'Aktualizacja agenta: ' + row.data.certname, true),
      new UniversalBrowserAction('Pokaż fakty', 'category',
        (row: UniversalBrowserRow) => this.onShowFacts(row), true)
    ];
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
