import { Observable } from "rxjs";
import { UniversalBrowserParams } from "../model/universal-browser-params";
import { UniversalBrowserFullDto } from "../model/universal-browser-full-dto";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

export abstract class AbstractUniversalBrowserService {

  protected constructor(protected http: HttpClient) {
  }

  protected abstract getBaseUrl(): string;

  fetchData(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/fetchData', params);
  }

  getUniversalBrowserFullDto(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<UniversalBrowserFullDto> {
    return this.http.post<UniversalBrowserFullDto>(this.getApiUrl() + '/getFullBrowserData', params);
  }

  getTotalRowCount(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<number> {
    return this.http.post<number>(this.getApiUrl() + '/getTotalRowCount', params);
  }

  protected getApiUrl(): string {
    return environment.apiHostUrl + this.getBaseUrl();
  }
}
