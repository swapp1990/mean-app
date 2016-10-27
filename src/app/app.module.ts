import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HotelService} from "./services/hotels.service";
import {routedComponents, AppRoutingModule} from "./routes/app-routing.module";

import {InputTextModule, AccordionModule, TabViewModule, TreeTableModule,TreeNode,SharedModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InputTextModule,
    AccordionModule,
    TabViewModule,
    TreeTableModule,
    SharedModule
  ],
  providers: [HotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
