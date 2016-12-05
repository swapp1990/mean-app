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
  ContextMenuModule, MenuItem, MenuModule, OverlayPanelModule, ProgressBarModule
} from 'primeng/primeng';
import {TreeTable} from "./components/utils/tree-table/tree-table.component";
import {MonthlyService} from "./services/months.service";
import {DataTable} from "./components/utils/data-table/data-table.component";

import {TaskService} from "./services/tasks.service";
import {QuantityData} from "./components/rich-text-view/QuantityData.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import {TreeView} from "./components/utils/tree/s-tree.component";
import {MyGraph} from "./components/utils/graph/graph.component";
import {TestComponent} from "./components/rich-text-view/test-comp.component";
import {MyOverlay} from "./components/utils/overlay-panel/my-overlay.component";
import {MyExpander} from "./components/utils/expander/expander-view.component";
import {MyAutoComplete} from "./components/utils/auto-complete/autocomplete.component";
import {MonthlyTypeComponent} from "./components/expense-app/monthly-view/monthly-type.component";
import {CategoryView} from "./components/expense-app/monthly-view/category-view.component";
import {MyProgressBar} from "./components/utils/progress-bar/progress-bar.component";
import DynamicComponent from "./components/utils/dynamic-component/dynamic-component";
import {TextData} from "./components/rich-text-view/TextData.component";
import {DetailsView} from "./components/expense-app/details-view/details-view.component";
import {EducationLoan} from "./components/expense-app/details-view/education-loan.dyn.component";

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    TreeTable,
    DataTable,
    TreeView,
    MyOverlay,
    MyExpander,
    MyGraph,
    MyAutoComplete,
    MyProgressBar,
    MonthlyTypeComponent,
    CategoryView,
    DetailsView,
    EducationLoan,
    QuantityData,
    TextData,
    TestComponent,
    Ng2Summernote,
    DynamicComponent
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
    OverlayPanelModule,
    ProgressBarModule,
    CKEditorModule
  ],
  providers: [HotelService, MonthlyService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
