import { Observable } from "rxjs";
import { UniversalBrowserParams } from "../model/universal-browser-params";
import { UniversalBrowserFullDto } from "../model/universal-browser-full-dto";
import { HttpClient } from "@angular/common/http";
import { AbstractBackendService } from "../../abstract-backend-service/abstract-backend.service";

export abstract class AbstractUniversalBrowserService extends AbstractBackendService {

  protected constructor(http: HttpClient) {
    super(http);
  }

  fetchData(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/fetchData', params);
  }

  getUniversalBrowserFullDto(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<UniversalBrowserFullDto> {
    return this.http.post<UniversalBrowserFullDto>(this.getApiUrl() + '/getFullBrowserData', params);
  }

  getTotalRowCount(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<number> {
    return this.http.post<number>(this.getApiUrl() + '/getTotalRowCount', params);
  }
}
