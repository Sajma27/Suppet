import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  AbstractUniversalBrowserCrudService
} from "../../../../../commons/universal-browser/core/abstract-universal-browser-crud.service";
import { ClassDto } from "../model/class-dto";
import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";
import {
  ActiveEnvironmentManager
} from "../../../../../commons/common-components/active-environment-manager/active-environment-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends AbstractUniversalBrowserCrudService<ClassDto> {

  constructor(http: HttpClient,
              private environmentManager: ActiveEnvironmentManager) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/classes';
  }

  protected getDtoFromRow(row: UniversalBrowserRow): ClassDto {
    const classDto: ClassDto = super.getDtoFromRow(row);
    classDto.environment = this.environmentManager.activeEnvironment;
    return classDto;
  }
}
