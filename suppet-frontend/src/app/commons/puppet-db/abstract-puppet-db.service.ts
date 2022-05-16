import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UniversalBrowserParams } from "../../components/universal-browser/model/universal-browser-params";
import { UniversalBrowserFullDto } from "../../components/universal-browser/model/universal-browser-full-dto";
import {
  AbstractUniversalBrowserService
} from "../../components/universal-browser/core/abstract-universal-browser.service";

export abstract class AbstractPuppetDbService extends AbstractUniversalBrowserService {

  protected constructor(http: HttpClient) {
    super(http);
  }

  protected abstract getBaseUrl(): string;

  fetchData(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<any[]> {
    return this.http.post<any[]>(this.getApiUrl() + '/fetchData', params);
  }

  getUniversalBrowserFullDto(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<UniversalBrowserFullDto> {
    return this.http.post<UniversalBrowserFullDto>(this.getApiUrl() + '/getFullPuppetData', params);
  }

  getTotalRowCount(params: UniversalBrowserParams = new UniversalBrowserParams()): Observable<number> {
    return this.http.post<number>(this.getApiUrl() + '/getTotalRowCount', params);
  }
}
