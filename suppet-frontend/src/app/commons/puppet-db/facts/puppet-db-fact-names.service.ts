import { Injectable } from '@angular/core';
import {AbstractPuppetDbService} from "../abstract-puppet-db.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PuppetDbFactNamesService extends AbstractPuppetDbService {

  constructor(http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    return "/puppet-db/fact-names";
  }
}
