import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { dateOperators, numberOperators, operators, QueryField, stringOperators } from "../../model/query-field";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UniversalBrowserHeader } from "../../model/universal-browser-header";
import { Subscription } from "rxjs";
import { UniversalBrowserHeaderTypes } from "../../model/universal-browser-header-types";
import { UniversalBrowserConfig } from "../../model/universal-browser-config";

@Component({
  selector: 'app-universal-browser-filters-adding-menu',
  templateUrl: './universal-browser-filters-adding-menu.component.html',
  styleUrls: ['./universal-browser-filters-adding-menu.component.scss']
})
export class UniversalBrowserFiltersAddingMenuComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  potentialOperators: string[] = operators;

  @Input() config: UniversalBrowserConfig;
  @Input() headers: UniversalBrowserHeader[] = [];
  @Output() addButtonClicked: EventEmitter<QueryField> = new EventEmitter<QueryField>();
  @Output() closeButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  fieldNameControl: FormControl = new FormControl(this.headers?.length > 0 ? this.headers[0] : null, Validators.required);
  operatorControl: FormControl = new FormControl({ value: '=', disabled: true }, Validators.required);
  valueControl: FormControl = new FormControl({ value: null, disabled: true }, Validators.required);

  isAddButtonDisabled: boolean = true;
  isAddButtonClicked: boolean = false;

  private fieldNameValueChangeListener: Subscription;
  private operatorValueChangeListener: Subscription;
  private valueControlValueChangeListener: Subscription;

  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      fieldNameControl: this.fieldNameControl,
      operationControl: this.operatorControl,
      valueControl: this.valueControl,
    });

    this.addFieldNameValueChangeListener();
    this.addOperatorValueChangeListener();
    this.addValueControlValueChangeListener();
  }

  ngOnInit() {
    this.config.browserDisabled = true;
  }

  ngOnDestroy(): void {
    this.fieldNameValueChangeListener?.unsubscribe();
    this.operatorValueChangeListener?.unsubscribe();
    this.config.browserDisabled = false;
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

  private addFieldNameValueChangeListener(): void {
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
      if (this.fieldNameControl.invalid) {
        this.operatorControl.disable();
        this.valueControl.disable();
      } else {
        this.operatorControl.enable();
      }
    });
  }

  private addOperatorValueChangeListener(): void {
    this.operatorValueChangeListener = this.operatorControl.valueChanges.subscribe((value: string) => {
      if (value) {
        this.valueControl.enable();
      } else {
        this.valueControl.disable();
      }
    });
  }

  private addValueControlValueChangeListener(): void {
    this.valueControlValueChangeListener = this.valueControl.valueChanges.subscribe((value: string) => {
      this.isAddButtonDisabled = !value;
    });
  }

}
