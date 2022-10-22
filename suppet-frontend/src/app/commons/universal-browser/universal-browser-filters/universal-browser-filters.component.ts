import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UniversalBrowserConfig } from "../model/universal-browser-config";
import { UniversalBrowserHeader } from "../model/universal-browser-header";
import { QueryField } from "../model/query-field";

@Component({
  selector: 'app-universal-browser-filters',
  templateUrl: './universal-browser-filters.component.html',
  styleUrls: ['./universal-browser-filters.component.scss']
})
export class UniversalBrowserFiltersComponent {

  @Input() config: UniversalBrowserConfig;
  @Input() headers: UniversalBrowserHeader[];
  @Output() onFilterAdded: EventEmitter<QueryField> = new EventEmitter<QueryField>();
  @Output() onFilterRemoved: EventEmitter<number> = new EventEmitter<number>();

  addingMenuVisible: boolean = false;

  onXClicked(idx: number) {
    this.onFilterRemoved.emit(idx);
  }

  onShowAddingMenuClicked(): void {
    this.addingMenuVisible = true;
  }

  onAddClicked(query: QueryField): void {
    this.onFilterAdded.emit(query);
    this.onCloseAddingMenuClicked();
  }

  onCloseAddingMenuClicked(): void {
    this.addingMenuVisible = false;
  }

}
