import { Component, Input, OnInit } from '@angular/core';
import { UniversalBrowserConfig } from "../model/universal-browser-config";
import { take } from "rxjs/operators";
import { UniversalBrowserHeader } from "../model/universal-browser-header";
import { UniversalBrowserAction } from "../model/universal-browser-action";
import { UniversalBrowserFullDto } from "../model/universal-browser-full-dto";
import { AbstractUniversalBrowserService } from "../core/abstract-universal-browser.service";
import { Sort } from "@angular/material/sort";
import { flatMap } from "rxjs/internal/operators";
import { UniversalBrowserRow } from "../model/universal-browser-row";
import { UniversalBrowserHeaderTypes } from "../model/universal-browser-header-types";
import { Observable } from "rxjs";
import { UniversalBrowserParams } from "../model/universal-browser-params";
import _ from "lodash";
import { ActiveEnvironmentManager } from "../../active-environment-manager/active-environment-manager.service";
import { QueryField } from "../model/query-field";
import { OrderByField } from "../model/order-by-field";

@Component({
  selector: 'app-universal-browser',
  templateUrl: './universal-browser.component.html',
  styleUrls: ['./universal-browser.component.scss']
})
export class UniversalBrowserComponent implements OnInit {

  @Input() set browserData(puppetData: UniversalBrowserFullDto) {
    this._browserData = puppetData;
    this.numOfRows = puppetData?.data.length || 0;
  };

  get data(): any[] {
    return this._browserData?.data;
  }

  get columns(): string[] {
    return this._browserData?.columns;
  }

  get headers(): UniversalBrowserHeader[] {
    return this._browserData?.headers || [new UniversalBrowserHeader('-', 'Ładowanie...')];
  }

  @Input() service: AbstractUniversalBrowserService;
  @Input() config: UniversalBrowserConfig;

  protected numOfRows: number = 0;
  protected totalNumOfRows: number = null;
  protected _browserData: UniversalBrowserFullDto;
  protected loading: boolean = false;
  protected loadingError: boolean = false;
  protected clickedRow: any = null;

  constructor(public environmentManager: ActiveEnvironmentManager) {
  }

  ngOnInit(): void {
    this.addRefreshAction();
    this.refresh();
  }

  showLoadMoreButton(): boolean {
    return !this.loading && !this.loadingError && this.totalNumOfRows > this.numOfRows;
  }

  showLoadingSpinner(): boolean {
    return this.loading;
  }

  showNoDataMessage(): boolean {
    return this.numOfRows === 0 && !this.showLoadingSpinner() && !this.loadingError;
  }

  showLoadingError(): boolean {
    return this.loadingError && !this.showLoadingSpinner();
  }

  getActiveEnvironment(): string {
    return !_.isNil(this.environmentManager.activeEnvironment) ? this.environmentManager.activeEnvironment : 'Nie wybrano';
  }

  loadMoreRows(): void {
    if (!this.loading) {
      this.loading = true;
      this.loadingError = false;
      this.config.params.offset += this.config.params.limit;
      this.service?.fetchData(this.getConfigParamsWithActiveEnvironment())
        .pipe(take(1))
        .subscribe((data: any[]) => {
          this._browserData.data = [...this._browserData.data, ...data];
          this.loading = false;
          this.loadingError = false;
          this.numOfRows += this.config.params.limit;
        }, () => {
          this.config.params.offset -= this.config.params.limit;
          this.loading = false;
          this.loadingError = true;
        });
    }
  }

  onRowClicked(row: UniversalBrowserRow): void {
    if (this.config.clickableRows) {
      this.clickedRow = this.clickedRow?.idx !== row.idx ? row : null;
    }
  }

  isRowClicked(row: UniversalBrowserRow): boolean {
    return this.clickedRow?.idx == row?.idx;
  }

  getClickedRow(): any {
    return this.clickedRow;
  }

  onFilterAdded(query: QueryField) {
    this.config.params.query.push(query);
    this.refresh();
  }

  onFilterRemoved(idx: number) {
    this.config.params.query.splice(idx, 1);
    this.refresh();
  }

  onSortChange(sortState: Sort) {
    if (this.config.params.orderBy.length > 0) {
      if (sortState.direction !== '') {
        this.config.params.orderBy[0].field = sortState.active;
        this.config.params.orderBy[0].order = sortState.direction;
      } else {
        this.config.params.orderBy = [];
      }
    } else if (sortState.direction !== '') {
      this.config.params.orderBy.push(new OrderByField(sortState.active, sortState.direction));
    }
    this.refresh();
  }

  getDateValue(element: any, header: UniversalBrowserHeader): string {
    return (element[header.dataField] as string)?.replace('UTC', '');
  }

  getValue(element: any, header: UniversalBrowserHeader): string {
    const stringValue: string = element[header.dataField] as string;
    if (typeof stringValue === 'object') {
      return JSON.stringify(element[header.dataField]);
    }
    return stringValue;
  }

  isDatetimeHeader(header: UniversalBrowserHeader): boolean {
    return header.type === UniversalBrowserHeaderTypes.DATETIME;
  }

  getDataFromServerFunction(): (row: UniversalBrowserRow) => Observable<any> {
    return null;
  }

  getRefreshFunc(): Function {
    return () => this.refresh();
  }

  refresh(): void {
    if (!this.loading) {
      this.clickedRow = null;
      this.browserData = null;
      this.loading = true;
      this.loadingError = false;
      this.config.params.offset = 0;
      if (this.config.usingTotalRowCount) {
        this.loadTotalRowCountAndData();
      } else {
        this.loadData();
      }
    }
  }

  private loadTotalRowCountAndData(): void {
    this.service.getTotalRowCount(this.getConfigParamsWithActiveEnvironment())
      .pipe(
        flatMap((totalNumOfRows: number) => {
          this.totalNumOfRows = totalNumOfRows;
          return this.service.getUniversalBrowserFullDto(this.getConfigParamsWithActiveEnvironment());
        }))
      .pipe(take(1))
      .subscribe(
        (puppetFullDataDto: UniversalBrowserFullDto) => this.processLoadedData(puppetFullDataDto),
        () => this.handleDataLoadingError()
      );
  }

  private loadData(): void {
    this.service.getUniversalBrowserFullDto(this.getConfigParamsWithActiveEnvironment())
      .subscribe(
        (puppetFullDataDto: UniversalBrowserFullDto) => this.processLoadedData(puppetFullDataDto),
        () => this.handleDataLoadingError()
      );
  }

  private getConfigParamsWithActiveEnvironment(): UniversalBrowserParams {
    if (_.isNil(this.config.environmentFieldName)) {
      return this.config.params;
    }
    const configWithEnvironment = _.cloneDeep(this.config.params);
    if (!_.isNil(this.environmentManager.activeEnvironment)) {
      configWithEnvironment.query = configWithEnvironment.query.filter(queryField => queryField.field !== this.config.environmentFieldName);
      const environmentQueryField: QueryField = new QueryField();
      environmentQueryField.field = this.config.environmentFieldName;
      environmentQueryField.value = this.environmentManager.activeEnvironment;
      configWithEnvironment.query.push(environmentQueryField);
    }
    return configWithEnvironment;
  }

  private processLoadedData(puppetFullDataDto: UniversalBrowserFullDto): void {
    puppetFullDataDto.columns = ['idx', ...puppetFullDataDto.columns];
    this.browserData = puppetFullDataDto;
    this.loading = false;
    this.loadingError = false;
  }

  private handleDataLoadingError(): void {
    this.totalNumOfRows = null;
    this.loading = false;
    this.loadingError = true;
  }

  protected addRefreshAction(): void {
    if (this.config.addRefreshAction) {
      this.config.actions = [
        new UniversalBrowserAction('Odśwież', 'refresh', () => {
        }, false, true),
        ...this.config.actions
      ];
    }
  }
}
