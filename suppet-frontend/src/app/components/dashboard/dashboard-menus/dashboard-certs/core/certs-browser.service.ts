import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AbstractUniversalBrowserService } from "../../../../universal-browser/core/abstract-universal-browser.service";

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
}
