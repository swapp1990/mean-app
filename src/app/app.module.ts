import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HotelService} from "./services/hotels.service";
import {routedComponents, AppRoutingModule} from "./routes/app-routing.module";

import {
  InputTextModule, AccordionModule, TabViewModule, TreeTableModule, TreeNode, TreeModule, SharedModule, DataTableModule,
  ToggleButtonModule, ButtonModule, DropdownModule, AutoCompleteModule, ChartModule, CheckboxModule, EditorModule,
  ContextMenuModule, MenuItem, MenuModule
} from 'primeng/primeng';
import {TreeTable} from "./components/utils/tree-table/tree-table.component";
import {MonthlyService} from "./services/months.service";
import {DataTable} from "./components/utils/data-table/data-table.component";
import {AutoCompleteColumn} from "./components/utils/data-table/autocomplete-column.component";
import {MonthlyTypeComponent} from "./components/monthly-view/monthly-type.component";
import {TaskService} from "./services/tasks.service";
import {QuantityData} from "./components/rich-text-view/QuantityData.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import {TreeView} from "./components/utils/tree/s-tree.component";

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    TreeTable,
    DataTable,
    TreeView,
    AutoCompleteColumn,
    MonthlyTypeComponent,
    QuantityData,
    Ng2Summernote
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
    TreeModule,
    ToggleButtonModule,
    DropdownModule,
    ButtonModule,
    AutoCompleteModule,
    CheckboxModule,
    EditorModule,
    ContextMenuModule,
    MenuModule,
    ChartModule,
    SharedModule,
    CKEditorModule
  ],
  providers: [HotelService, MonthlyService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
