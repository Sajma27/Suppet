import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AbstractUniversalBrowserService } from "./abstract-universal-browser.service";
import { UniversalBrowserActionResult } from "../model/universal-browser-action-result";
import { UniversalBrowserRow } from "../model/universal-browser-row";

export abstract class AbstractUniversalBrowserCrudService<DTO> extends AbstractUniversalBrowserService {

  protected constructor(http: HttpClient) {
    super(http);
  }

  get(row: UniversalBrowserRow): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/get', row.data as DTO);
  }

  add(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/add', row.data as DTO);
  }

  edit(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/edit', row.data as DTO);
  }

  delete(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/delete', row.data as DTO);
  }
}
