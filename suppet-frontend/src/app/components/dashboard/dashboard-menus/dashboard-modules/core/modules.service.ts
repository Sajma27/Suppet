import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  AbstractUniversalBrowserCrudService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser-crud.service";
import { ModuleDto } from "../model/module-dto";
import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";
import { Observable } from "rxjs";
import {
  UniversalBrowserActionResult
} from "../../../../../commons/universal-browser/model/universal-browser-action-result";
import {
  ActiveEnvironmentManager
} from "../../../../../commons/active-environment-manager/active-environment-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ModulesService extends AbstractUniversalBrowserCrudService<ModuleDto> {

  constructor(http: HttpClient,
              private environmentManager: ActiveEnvironmentManager) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/modules';
  }

  upgrade(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/upgrade', this.getDtoFromRow(row));
  }

  upgradeToNewest(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/upgradeToNewest', this.getDtoFromRow(row));
  }

  protected getDtoFromRow(row: UniversalBrowserRow): ModuleDto {
    return new ModuleDto(null, row.data.name, row.data.version, this.environmentManager.activeEnvironment);
  }

}
