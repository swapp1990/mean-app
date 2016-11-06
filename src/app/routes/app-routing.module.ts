import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotelComponent} from "../components/hotel/hotel.component";
import {MonthlyComponent} from "../components/monthly-view/monthly.component";
import {MonthlyGraphView} from "../components/monthly-view/monthly-graph.component";
import {TasksComponent} from "../components/tasks-view/tasks.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HotelComponent, MonthlyComponent, MonthlyGraphView, TasksComponent];
