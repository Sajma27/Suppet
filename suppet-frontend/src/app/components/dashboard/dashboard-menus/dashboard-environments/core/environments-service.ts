import {
  AbstractUniversalBrowserCrudService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser-crud.service";
import { EnvironmentDto } from "../model/environment-dto";
import { HttpClient } from "@angular/common/http";
import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";
import { Observable } from "rxjs";
import {
  UniversalBrowserActionResult
} from "../../../../../commons/universal-browser/model/universal-browser-action-result";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService extends AbstractUniversalBrowserCrudService<EnvironmentDto> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/environments';
  }

  copy(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.get<UniversalBrowserActionResult>(
      this.getApiUrl() + '/copy',
      { params: { sourceEnvName: row.data.name, newEnvName: row.data.newEnvName } });
  }
}
