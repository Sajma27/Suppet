import { HttpClient } from "@angular/common/http";
import { AbstractUniversalBrowserService } from "../universal-browser/core/abstract-universal-browser.service";

export abstract class AbstractPuppetDbService extends AbstractUniversalBrowserService {

  protected constructor(http: HttpClient) {
    super(http);
  }

  protected abstract getBaseUrl(): string;

}
