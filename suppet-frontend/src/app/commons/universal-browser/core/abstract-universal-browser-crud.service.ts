import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AbstractUniversalBrowserService } from "./abstract-universal-browser.service";
import { UniversalBrowserActionResult } from "../model/universal-browser-action-result";
import { UniversalBrowserRow } from "../model/universal-browser-row";

export abstract class AbstractUniversalBrowserCrudService<DTO> extends AbstractUniversalBrowserService {

  protected constructor(http: HttpClient) {
    super(http);
  }

  get(row: UniversalBrowserRow): Observable<any> {
    return this.http.post<any>(this.getApiUrl() + '/get', this.getDtoFromRow(row));
  }

  add(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/add', this.getDtoFromRow(row));
  }

  validateAdd(dto: DTO): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/validate_add', dto);
  }

  edit(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/edit', this.getDtoFromRow(row));
  }

  validateEdit(dto: DTO): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/validate_edit', dto);
  }

  delete(row: UniversalBrowserRow): Observable<UniversalBrowserActionResult> {
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/delete', this.getDtoFromRow(row));
  }

  protected getDtoFromRow(row: UniversalBrowserRow): DTO {
    return row.data as DTO;
  }
}
