import { Observable } from "rxjs";
import { UniversalBrowserParams } from "../model/universal-browser-params";
import { UniversalBrowserFullDto } from "../model/universal-browser-full-dto";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

export abstract class AbstractUniversalBrowserService {

  protected constructor(protected http: HttpClient) {
  }

  protected abstract getBaseUrl(): string;

  abstract fetchData(params: UniversalBrowserParams): Observable<any[]>;

  abstract getUniversalBrowserFullDto(params: UniversalBrowserParams): Observable<UniversalBrowserFullDto>;

  abstract getTotalRowCount(params: UniversalBrowserParams): Observable<number>;

  protected getApiUrl(): string {
    return environment.apiHostUrl + this.getBaseUrl();
  }
}
