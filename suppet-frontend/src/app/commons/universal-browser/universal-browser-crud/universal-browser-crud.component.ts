import { Component, Input } from '@angular/core';
import { UniversalBrowserRow } from "../model/universal-browser-row";
import _ from "lodash";
import { UniversalBrowserAsyncAction } from "../model/universal-browser-async-action";
import { UniversalBrowserComponent } from "../ui/universal-browser.component";
import { UniversalBrowserCrudConfig } from "../model/universal-browser-crud-config";
import { AbstractUniversalBrowserCrudService } from "../core/abstract-universal-browser-crud.service";
import { UniversalBrowserFormMode } from "../universal-browser-form/model/universal-browser-form-mode";
import { UniversalBrowserAction } from "../model/universal-browser-action";
import { Observable } from "rxjs";
import { GlobalProcessesManager } from "../../common-components/global-processes-browser/core/global-processes.manager";
import { ActiveEnvironmentManager } from "../../active-environment-manager/active-environment-manager.service";

@Component({
  selector: 'app-universal-browser-crud',
  templateUrl: '../ui/universal-browser.component.html',
  styleUrls: ['../ui/universal-browser.component.scss']
})
export class UniversalBrowserCrudComponent extends UniversalBrowserComponent {

  @Input() service: AbstractUniversalBrowserCrudService<any>;
  @Input() config: UniversalBrowserCrudConfig;

  constructor(private processesManager: GlobalProcessesManager,
              public environmentManager: ActiveEnvironmentManager) {
    super(environmentManager);
  }

  ngOnInit(): void {
    this.addFormActions();
    super.ngOnInit();
  }

  getDataFromServerFunction(): (row: UniversalBrowserRow) => Observable<any> {
    return (row: UniversalBrowserRow) => this.service.get(row);
  }

  protected addFormActions(): void {
    if (!_.isNil(this.config.formComponent)) {
      const formActions: UniversalBrowserAction[] = [];
      if (!this.config.hideNewAction) {
        formActions.push(new UniversalBrowserAsyncAction(
          this.processesManager, 'Dodaj', 'add', (row: UniversalBrowserRow) => this.service.add(row),
          false, () => this.config.title + ': Dodawnie nowego obiektu', true,
          this.config.formComponent, UniversalBrowserFormMode.NEW,
          [], false,
          this.config.withValidation ? (dto: any) => this.service.validateAdd(dto) : null));
      }
      if (!this.config.hideEditAction) {
        formActions.push(new UniversalBrowserAsyncAction(
          this.processesManager, 'Edytuj', 'edit', (row: UniversalBrowserRow) => this.service.edit(row),
          !_.isNil(this.config.editDisabledFunc) ? (row: UniversalBrowserRow) => this.config.editDisabledFunc(row) : true,
          () => this.config.title + ': Edycja obiektu', true,
          this.config.formComponent, UniversalBrowserFormMode.EDIT,
          [], this.config.withFormsLoadingFromBackend,
          this.config.withValidation ? (dto: any) => this.service.validateEdit(dto) : null));
      }
      if (!this.config.hideDeleteAction) {
        formActions.push(new UniversalBrowserAsyncAction(
          this.processesManager, 'Usuń', 'delete', (row: UniversalBrowserRow) => this.service.delete(row),
          !_.isNil(this.config.deleteDisabledFunc) ? (row: UniversalBrowserRow) => this.config.deleteDisabledFunc(row) : true,
          () => this.config.title + ': Usuwanie obiektu', true,
          this.config.formComponent, UniversalBrowserFormMode.DELETE, [],
          this.config.withFormsLoadingFromBackend));
      }
      this.config.actions = [...formActions, ...this.config.actions];
    }
  }

}
