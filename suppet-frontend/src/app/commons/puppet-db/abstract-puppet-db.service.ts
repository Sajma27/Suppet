import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export abstract class AbstractPuppetDbService {

  protected constructor(private http: HttpClient) {
  }

  protected abstract getBaseUrl(): string;

  getAll(): Observable<any> {
    return this.http.get<any>(this.getApiUrl() + '/getAll');
  }

  private getApiUrl(): string {
    return environment.apiHostUrl + this.getBaseUrl();
  }
}
