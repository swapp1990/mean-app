import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {environment} from "../../environments/environment";
import {Hotel} from "../models/hotel";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {MonthData} from "../models/month";

@Injectable()
export class MonthlyService {
  private monthsUrl = environment.server +'/api/months';  // URL to web api

  constructor(private http: Http) { }

  //Get all monthly data
  getMonthlyData(): Observable<MonthData[]> {
    return this.http
      .get(this.monthsUrl)
      .map((response: Response) => response.json());
  }

  //Get monthly data for category types
  getMonthlyDataByCategory(category: string, month: string): Observable<MonthData[]> {
    let newUrl = this.monthsUrl + '?category='+ category+'&month='+ month;
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Create Monthly Data.
  createMonthData(monthBody: MonthData) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.monthsUrl, JSON.stringify(monthBody), { headers: headers })
      .map((response: Response) => response.json());
  }

  //Update Monthly Data.
  updateMonthlyData(monthDataId: string, monthBody: MonthData) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let newUrl = this.monthsUrl + '/'+monthDataId;
    return this.http
      .put(newUrl, JSON.stringify(monthBody), { headers: headers })
      .map((response: Response) => response.json());
  }

  monthGetAllCostByCategory(): Observable<any[]> {
    let newUrl = this.monthsUrl +'/price';
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Get all Prices for Monthly Data.
  monthGetAllCost(month: string): Observable<any[]> {
    let newUrl = this.monthsUrl +'/price'+ '?month='+ month;
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Get all names for month and category.
  getAllNamesByCategory(category: string, month: string): Observable<any[]> {
    let newUrl = this.monthsUrl +'/name'+ '?category='+ category+'&month='+ month;
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Delete Monthly Data by Id.
  deleteMonthlyData(monthDataId: string) {
    let newUrl = this.monthsUrl + '/'+monthDataId;
    return this.http
      .delete(newUrl)
      .map((response: Response) => response.json());
  }

  //Add new Hero
  private post(hotel: Hotel): Observable<Hotel> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.monthsUrl, JSON.stringify(hotel), { headers: headers })
      .map((response: Response) => response.json());
  }

  // getHotels(): Promise<Hotel[]> {
  //   return this.http
  //     .get(this.hotelsUrl)
  //     .toPromise()
  //     .then(response => response.json() as Hotel[])
  //     .catch(this.handleError);
  // }

  // getHero(id: number): Promise<Hero> {
  //   return this.getHeroes()
  //     .then(heroes => heroes.find(hero => hero.id === id));
  // }

  // save(hero: Hero): Promise<Hero> {
  //   if (hero.id) {
  //     return this.put(hero);
  //   }
  //   return this.post(hero);
  // }

  // delete(hero: Hero): Promise<Response> {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //
  //   let url = `${this.heroesUrl}/${hero.id}`;
  //
  //   return this.http
  //     .delete(url, { headers: headers })
  //     .toPromise()
  //     .catch(this.handleError);
  // }



  // Update existing Hero
  // private put(hero: Hero): Promise<Hero> {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //
  //   let url = `${this.heroesUrl}/${hero.id}`;
  //
  //   return this.http
  //     .put(url, JSON.stringify(hero), { headers: headers })
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
