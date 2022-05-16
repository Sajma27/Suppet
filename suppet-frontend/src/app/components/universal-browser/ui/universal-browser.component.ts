import { Component, Input, OnInit } from '@angular/core';
import { UniversalBrowserConfig } from "../model/universal-browser-config";
import { take } from "rxjs/operators";
import { UniversalBrowserHeader } from "../model/universal-browser-header";
import { UniversalBrowserAction } from "../model/universal-browser-action";
import { UniversalBrowserFullDto } from "../model/universal-browser-full-dto";
import { AbstractUniversalBrowserService } from "../core/abstract-universal-browser.service";

@Component({
  selector: 'app-universal-browser',
  templateUrl: './universal-browser.component.html',
  styleUrls: ['./universal-browser.component.scss']
})
export class UniversalBrowserComponent implements OnInit {

  @Input() set puppetData(puppetData: UniversalBrowserFullDto) {
    this._puppetData = puppetData;
    this.numOfRows = puppetData?.data.length;
  };

  get data(): any[] {
    return this._puppetData?.data;
  }

  get columns(): string[] {
    return this._puppetData?.columns;
  }

  get headers(): UniversalBrowserHeader[] {
    return this._puppetData?.headers || [new UniversalBrowserHeader('-', 'Ładowanie...')];
  }

  @Input() service: AbstractUniversalBrowserService;
  @Input() config: UniversalBrowserConfig;

  private numOfRows: number = 0;
  private totalNumOfRows: number = null;
  private _puppetData: UniversalBrowserFullDto;
  private loading: boolean = false;
  private loadingError: boolean = false;
  private clickedRow: any = null;

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

  showLoadingError(): boolean {
    return !this.showLoadingSpinner() && this.loadingError;
  }

  loadMoreRows(): void {
    if (!this.loading) {
      this.loading = true;
      this.loadingError = false;
      this.service?.fetchData(this.config.params)
        .pipe(take(1))
        .subscribe((data: any[]) => {
          this.puppetData.data = data;
          this.loading = false;
          this.loadingError = false;
          this.config.params.offset += this.config.pageLimit;
          this.numOfRows += this.config.pageLimit;
        }, () => {
          this.loading = false;
          this.loadingError = true;
        });
    }
  }

  onRowClicked(row: any): void {
    if (this.config.clickableRows) {
      this.clickedRow = this.clickedRow?.idx !== row.idx ? row : null;
    }
  }

  isRowClicked(row: any): boolean {
    return this.clickedRow?.idx == row?.idx;
  }

  getClickedRow(): any {
    return this.clickedRow;
  }

  private addRefreshAction(): void {
    if (this.config.addRefreshAction) {
      this.config.actions = [
        new UniversalBrowserAction('Odśwież', 'refresh', () => this.refresh()),
        ...this.config.actions
      ];
    }
  }

  private refresh(): void {
    if (!this.loading) {
      this.clickedRow = null;
      this.puppetData = null;
      this.loading = true;
      this.loadingError = false;
      this.config.params.offset = 0;
      this.service.getTotalRowCount(this.config.params)
        .pipe(take(1))
        .subscribe((totalNumOfRows: number) => {
          this.totalNumOfRows = totalNumOfRows;
        }, () => {
          this.totalNumOfRows = null;
        });
      this.service.getUniversalBrowserFullDto(this.config.params)
        .pipe(take(1))
        .subscribe((puppetFullDataDto: UniversalBrowserFullDto) => {
          puppetFullDataDto.columns = ['idx', ...puppetFullDataDto.columns];
          this.puppetData = puppetFullDataDto;
          this.loading = false;
          this.loadingError = false;
        }, () => {
          this.loading = false;
          this.loadingError = true;
        });
    }
  }
}
