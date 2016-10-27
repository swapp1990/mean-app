import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotelComponent} from "../components/hotel/hotel.component";
import {MonthlyComponent} from "../components/monthly-view/monthly.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/monthly',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: 'monthly',
    component: MonthlyComponent
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

export const routedComponents = [HotelComponent, MonthlyComponent];
