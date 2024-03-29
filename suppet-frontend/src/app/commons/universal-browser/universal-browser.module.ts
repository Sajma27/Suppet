import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalBrowserComponent } from './ui/universal-browser.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { MatDividerModule } from "@angular/material/divider";
import { UniversalBrowserFiltersComponent } from './universal-browser-filters/universal-browser-filters.component';
import {
  UniversalBrowserFiltersAddingMenuComponent
} from './universal-browser-filters/universal-browser-filters-adding-menu/universal-browser-filters-adding-menu.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import {
  UniversalBrowserActionButtonsComponent
} from "./universal-browser-action-buttons/universal-browser-action-buttons.component";
import {
  UniversalBrowserActionButtonComponent
} from "./universal-browser-action-buttons/universal-browser-action-button/universal-browser-action-button.component";
import { CommonComponentsModule } from "../common-components/common-components.module";
import { UniversalBrowserFormComponent } from './universal-browser-form/universal-browser-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { UniversalBrowserCrudComponent } from "./universal-browser-crud/universal-browser-crud.component";

@NgModule({
  declarations: [
    UniversalBrowserComponent,
    UniversalBrowserCrudComponent,
    UniversalBrowserFiltersComponent,
    UniversalBrowserFiltersAddingMenuComponent,
    UniversalBrowserActionButtonComponent,
    UniversalBrowserActionButtonsComponent,
    UniversalBrowserFormComponent
  ],
  exports: [
    UniversalBrowserComponent,
    UniversalBrowserCrudComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonComponentsModule,
    MatDialogModule,
    FormsModule
  ]
})
export class UniversalBrowserModule {
}
