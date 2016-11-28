import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotelComponent} from "../components/hotel/hotel.component";

import {MonthlyGraphView} from "../components/expense-app/graph-view/monthly-graph.component";
import {TasksComponent} from "../components/tasks-view/tasks.component";
import {RichTextComponent} from "../components/rich-text-view/rich-text.component";
import {SearchViewComponent} from "../components/expense-app/search-view/search-view.component";
import {MonthlyComponent} from "../components/expense-app/monthly-view/monthly.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/monthly',
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
