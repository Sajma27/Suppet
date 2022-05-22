import { Component, EventEmitter, Input, Output } from '@angular/core';
import { operators, QueryField } from "../../core/query-field";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UniversalBrowserHeader } from "../../model/universal-browser-header";

@Component({
  selector: 'app-universal-browser-filters-adding-menu',
  templateUrl: './universal-browser-filters-adding-menu.component.html',
  styleUrls: ['./universal-browser-filters-adding-menu.component.scss']
})
export class UniversalBrowserFiltersAddingMenuComponent {

  formGroup: FormGroup;
  fieldNameControl: FormControl;
  operatorControl: FormControl;
  valueControl: FormControl;

  potentialOperators: string[] = operators;

  @Input() headers: UniversalBrowserHeader[] = [];
  @Output() addButtonClicked: EventEmitter<QueryField> = new EventEmitter<QueryField>();
  @Output() closeButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.fieldNameControl = new FormControl(this.headers?.length > 0 ? this.headers[0] : null);
    this.operatorControl = new FormControl('=');
    this.valueControl = new FormControl('');
    this.formGroup = fb.group({
      fieldNameControl: this.fieldNameControl,
      operationControl: this.operatorControl,
      valueControl: this.valueControl,
    });
  }

  onAddClicked(): void {
    this.addButtonClicked.emit();
  }

  onCloseClicked(): void {
    this.closeButtonClicked.emit();
  }

}
