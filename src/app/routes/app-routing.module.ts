import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotelComponent} from "../components/hotel/hotel.component";
import {MonthlyComponent} from "../components/monthly-view/monthly.component";
import {MonthlyGraphView} from "../components/monthly-view/monthly-graph.component";
import {TasksComponent} from "../components/tasks-view/tasks.component";
import {RichTextComponent} from "../components/rich-text-view/rich-text.component";
import {SearchViewComponent} from "../components/monthly-view/search-view.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'monthly',
    component: MonthlyComponent
  },
  {
    path: 'search-view',
    component: SearchViewComponent
  },
  {
    path: 'graph',
    component: MonthlyGraphView
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'hotels',
    component: HotelComponent
  },
  {
    path: 'richtext',
    component: RichTextComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  HotelComponent,
  MonthlyComponent,
  MonthlyGraphView,
  TasksComponent,
  RichTextComponent,
  SearchViewComponent
];
