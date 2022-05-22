import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UniversalBrowserConfig } from "../model/universal-browser-config";
import { QueryField } from "../core/query-field";
import { UniversalBrowserHeader } from "../model/universal-browser-header";

@Component({
  selector: 'app-universal-browser-filters',
  templateUrl: './universal-browser-filters.component.html',
  styleUrls: ['./universal-browser-filters.component.scss']
})
export class UniversalBrowserFiltersComponent {

  @Input() config: UniversalBrowserConfig;
  @Input() headers: UniversalBrowserHeader[];
  @Output() onFilterRemoved: EventEmitter<number> = new EventEmitter<number>();

  addingMenuVisible: boolean = false;

  onXClicked(idx: number) {
    this.onFilterRemoved.emit(idx);
  }

  onShowAddingMenuClicked(): void {
    this.addingMenuVisible = !this.addingMenuVisible;
  }

  onAddClicked(query: QueryField): void {
    this.config.params.query.push(query);
  }

  onCloseAddingMenuClicked(): void {
    this.addingMenuVisible = false;
  }

}
