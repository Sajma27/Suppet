import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AbstractBackendService } from "../../../../../commons/abstract-backend-service/abstract-backend.service";
import {
  GlobalProcessBackendResponse
} from "../../../../../commons/common-components/global-processes-browser/model/global-process-backend-response";

@Injectable({
  providedIn: 'root'
})
export class AgentsService extends AbstractBackendService {

  constructor(http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/agents';
  }

  updateAgent(agent: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/updateAgent', { params: { agent: agent } });
  }
}
