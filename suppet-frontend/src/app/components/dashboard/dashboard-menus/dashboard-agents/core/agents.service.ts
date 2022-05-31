import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AbstractBackendService } from "../../../../../commons/abstract-backend-service/abstract-backend.service";

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

  updateAgent(agent: string): Observable<boolean> {
    return this.http.get<boolean>(this.getApiUrl() + '/updateAgent', { params: { agent: agent } });
  }
}
