import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  AbstractUniversalBrowserCrudService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser-crud.service";
import { ClassDto } from "../model/class-dto";

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends AbstractUniversalBrowserCrudService<ClassDto> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/classes';
  }
}
