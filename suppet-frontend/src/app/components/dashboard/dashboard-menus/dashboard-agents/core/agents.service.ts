import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AbstractBackendService } from "../../../../../commons/abstract-backend-service/abstract-backend.service";
import {
  GlobalProcessBackendResponse
} from "../../../../../commons/common-components/global-processes-browser/model/global-process-backend-response";
import {
  UniversalBrowserActionResult
} from "../../../../../commons/universal-browser/model/universal-browser-action-result";
import { AgentDto } from "../model/agent-dto";
import {
  ActiveEnvironmentManager
} from "../../../../../commons/common-components/active-environment-manager/active-environment-manager.service";

@Injectable({
  providedIn: 'root'
})
export class AgentsService extends AbstractBackendService {

  constructor(http: HttpClient,
              private environmentManager: ActiveEnvironmentManager) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/agents';
  }

  updateAgent(agent: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/updateAgent', { params: { agent: agent } });
  }

  addToHostsAndUpdateAgent(ip: string, agent: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/addToHostsAndUpdateAgent', { params: { agent, ip } });
  }

  changeAgentsEnvironment(agent: string, environment: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/changeAgentsEnvironment', { params: { agent, environment } });
  }

  setAgentsConfig(agent: AgentDto): Observable<GlobalProcessBackendResponse> {
    return this.http.post<GlobalProcessBackendResponse>(this.getApiUrl() + '/setAgentsConfig', agent);
  }

  getAgentWithConfig(agent: string): Observable<AgentDto> {
    return this.http.get<AgentDto>(this.getApiUrl() + '/getAgentWithConfig', { params: { agent: agent } });
  }

  getAgentWithClasses(agent: string): Observable<AgentDto> {
    return this.http.get<AgentDto>(this.getApiUrl() + '/getAgentWithClasses', { params: { agent: agent, environment: this.environmentManager.activeEnvironment } });
  }

  updateAgentsClassesManifest(agent: AgentDto): Observable<UniversalBrowserActionResult> {
    agent.environment = this.environmentManager.activeEnvironment;
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/updateAgentsClassesManifest', agent);
  }
}
