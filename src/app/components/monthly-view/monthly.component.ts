import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {HotelService} from "../../services/hotels.service";
import {Hotel} from "../../models/hotel";

@Component({
  selector: 'monthly-view',
  template: `<p-accordion>
               <p-accordionTab header="Header 1">
                Content 1
               </p-accordionTab>
               <p-accordionTab header="Header 2">
                  Content 2
               </p-accordionTab>
                <p-accordionTab header="Header 3">
                  Content 3
                </p-accordionTab>
              </p-accordion>`
})
export class MonthlyComponent implements OnInit {
  error: any;
  response: any;

  observable$: Observable<{}>;

  constructor(
    private http: Http,
    private router: Router,
    private hotelService: HotelService) {

  }

  ngOnInit(): void {
    // this.hotelService.getHotels()
    //   .subscribe (
    //     hotels => {
    //       this.hotels = hotels;
    //       console.log(this.hotels);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
  }
}
