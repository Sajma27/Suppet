import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export abstract class AbstractBackendService {

  protected constructor(protected http: HttpClient) {
  }

  protected abstract getBaseUrl(): string;

  protected getApiUrl(): string {
    return environment.apiHostUrl + this.getBaseUrl();
  }

}
