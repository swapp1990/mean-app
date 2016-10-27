import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {HotelService} from "../../services/hotels.service";
import {Hotel} from "../../models/hotel";

@Component({
  selector: 'hotel',
  templateUrl: 'hotel.component.html'
})
export class HotelComponent implements OnInit {
  hotels: Hotel[];
  error: any;
  response: any;

  observable$: Observable<{}>;

  constructor(
    private http: Http,
    private router: Router,
    private hotelService: HotelService) {

  }

  ngOnInit(): void {
    this.hotelService.getHotels()
      .subscribe (
        hotels => {
          this.hotels = hotels;
        },
        err => {
          console.log(err);
        }
      );

    //console.log(this.hotels);
  }
}
