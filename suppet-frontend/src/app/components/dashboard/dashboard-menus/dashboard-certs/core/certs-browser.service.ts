import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  AbstractUniversalBrowserService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser.service";
import { Observable } from "rxjs";
import {
  GlobalProcessBackendResponse
} from "../../../../../commons/common-components/global-processes-browser/model/global-process-backend-response";

@Injectable({
  providedIn: 'root'
})
export class CertsBrowserService extends AbstractUniversalBrowserService {

  constructor(http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    return "/puppet/certs";
  }

  signCert(certname: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/signCert', { params: { certname } });
  }

  revokeCert(certname: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/revokeCert', { params: { certname } });
  }

  cleanCert(certname: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/cleanCert', { params: { certname } });
  }
}
