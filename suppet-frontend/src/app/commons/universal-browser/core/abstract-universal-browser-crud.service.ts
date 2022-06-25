import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AbstractUniversalBrowserService } from "./abstract-universal-browser.service";

export abstract class AbstractUniversalBrowserCrudService<DTO> extends AbstractUniversalBrowserService {

  protected constructor(http: HttpClient) {
    super(http);
  }

  get(dto: DTO): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/get', dto);
  }

  add(dto: DTO): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/add', dto);
  }

  edit(dto: DTO): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/edit', dto);
  }

  delete(dto: DTO): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/delete', dto);
  }
}
