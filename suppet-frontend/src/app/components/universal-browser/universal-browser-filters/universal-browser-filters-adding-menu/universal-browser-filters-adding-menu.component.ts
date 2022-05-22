import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { dateOperators, numberOperators, operators, QueryField, stringOperators } from "../../core/query-field";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UniversalBrowserHeader } from "../../model/universal-browser-header";
import { Subscription } from "rxjs";
import { UniversalBrowserHeaderTypes } from "../../model/universal-browser-header-types";

@Component({
  selector: 'app-universal-browser-filters-adding-menu',
  templateUrl: './universal-browser-filters-adding-menu.component.html',
  styleUrls: ['./universal-browser-filters-adding-menu.component.scss']
})
export class UniversalBrowserFiltersAddingMenuComponent implements OnDestroy {

  formGroup: FormGroup;

  potentialOperators: string[] = operators;

  @Input() headers: UniversalBrowserHeader[] = [];
  @Output() addButtonClicked: EventEmitter<QueryField> = new EventEmitter<QueryField>();
  @Output() closeButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  fieldNameControl: FormControl = new FormControl(this.headers?.length > 0 ? this.headers[0] : null);
  operatorControl: FormControl = new FormControl('=');
  valueControl: FormControl = new FormControl();

  isAddButtonClicked: boolean = false;

  private fieldNameValueChangeListener: Subscription;

  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      fieldNameControl: this.fieldNameControl,
      operationControl: this.operatorControl,
      valueControl: this.valueControl,
    });

    this.fieldNameValueChangeListener = this.fieldNameControl.valueChanges.subscribe((value: UniversalBrowserHeader) => {
      switch (value.type) {
        case UniversalBrowserHeaderTypes.STRING:
           this.potentialOperators = stringOperators;
           break;
        case UniversalBrowserHeaderTypes.DATE:
        case UniversalBrowserHeaderTypes.DATETIME:
          this.potentialOperators = dateOperators;
          break;
        case UniversalBrowserHeaderTypes.NUMBER:
          this.potentialOperators = numberOperators;
          break;
        default:
          this.potentialOperators = operators;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.fieldNameValueChangeListener?.unsubscribe();
  }

  onAddClicked(): void {
    this.isAddButtonClicked = true;
    const query: QueryField = new QueryField();
    query.op = this.operatorControl.value;
    query.value = this.valueControl.value;
    query.field = (this.fieldNameControl.value as UniversalBrowserHeader).dataField;
    this.addButtonClicked.emit(query);
  }

  onCloseClicked(): void {
    this.closeButtonClicked.emit();
  }

}
