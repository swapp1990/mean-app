import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HotelService} from "./services/hotels.service";
import {routedComponents, AppRoutingModule} from "./routes/app-routing.module";

import {
  InputTextModule, AccordionModule, TabViewModule, TreeTableModule, TreeNode, SharedModule, DataTableModule,
  ToggleButtonModule, ButtonModule, DropdownModule, AutoCompleteModule
} from 'primeng/primeng';
import {TreeTable} from "./components/utils/tree-table/tree-table.component";
import {MonthlyService} from "./services/months.service";
import {DataTable} from "./components/utils/data-table/data-table.component";
import {AutoCompleteColumn} from "./components/utils/data-table/autocomplete-column.component";

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    TreeTable,
    DataTable,
    AutoCompleteColumn
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InputTextModule,
    AccordionModule,
    TabViewModule,
    DataTableModule,
    TreeTableModule,
    ToggleButtonModule,
    DropdownModule,
    ButtonModule,
    AutoCompleteModule,
    SharedModule
  ],
  providers: [HotelService, MonthlyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
