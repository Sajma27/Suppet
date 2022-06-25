import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  AbstractUniversalBrowserCrudService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser-crud.service";
import { ManifestDto } from "../model/manifest-dto";

@Injectable({
  providedIn: 'root'
})
export class ManifestsService extends AbstractUniversalBrowserCrudService<ManifestDto> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/manifests';
  }
}
