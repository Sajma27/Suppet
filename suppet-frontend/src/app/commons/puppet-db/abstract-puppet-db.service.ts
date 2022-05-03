import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { PuppetDbParams } from "./puppet-db-params";

export abstract class AbstractPuppetDbService {

  protected constructor(private http: HttpClient) {
  }

  protected abstract getBaseUrl(): string;

  fetchData(params: PuppetDbParams = new PuppetDbParams()): Observable<any> {
    return this.http.post<any>(this.getApiUrl(), params);
  }

  private getApiUrl(): string {
    return environment.apiHostUrl + this.getBaseUrl();
  }
}
