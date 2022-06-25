import { Component } from '@angular/core';
import {
  UniversalBrowserFormComponent
} from "../../../../../../commons/universal-browser/universal-browser-form/universal-browser-form.component";
import { ModuleDto } from "../../model/module-dto";
import { UniversalBrowserRow } from "../../../../../../commons/universal-browser/model/universal-browser-row";

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleFormComponent extends UniversalBrowserFormComponent<ModuleFormComponent, ModuleDto> {

  ngOnInit(): void {
  }

  getDtoFromRow(row: UniversalBrowserRow): ModuleDto {
    return super.getDtoFromRow(row);
  }

  getFormTitle(): string {
    return super.getFormTitle();
  }

  protected initFormFields() {
    super.initFormFields();
  }

}
