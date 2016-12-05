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
  private searchurl = environment.server +'/api/search';

  constructor(private http: Http) { }

  //Get all monthly data
  getMonthlyData(): Observable<MonthData[]> {
    return this.http
      .get(this.monthsUrl)
      .map((response: Response) => response.json());
  }

  //Get monthly data for category types
  getMonthlyDataByCategory(month: string, category: string): Observable<MonthData[]> {
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
    if(monthBody.detailsView) {
      delete monthBody.detailsView;
    }
    console.log(monthBody);
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

  //Get all Amount (Income & Expense) for Monthly Data.
  monthGetAllAmount(month: string): Observable<any[]> {
    let newUrl = this.monthsUrl +'/price'+ '?month='+ month;
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Get all Essential
  monthGetAllEssentialCost(month: string): Observable<any[]> {
    let newUrl = this.monthsUrl +'/price'+ '?month='+ month +'&isEssential=true';
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Get all Incomes for Monthly Data.
  monthGetAllIncomes(month: string, isIncome: string): Observable<any[]> {
    let newUrl = this.monthsUrl +'/price'+ '?month='+ month + '&isIncome' + isIncome;
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

  getAllNames(): Observable<any[]> {
    let newUrl = this.monthsUrl +'/name';
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  getAllDetails(): Observable<any[]> {
    let newUrl = this.monthsUrl +'/details';
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Delete Monthly Data by Id.
  deleteMonthlyData(monthDataId: string) {
    let newUrl = this.monthsUrl + '/'+monthDataId;
    return this.http
      .delete(newUrl)
      .map((response: Response) => null);
  }

  //Get Data based on Query.
  getAllDataBasedOnQuery(name: string): Observable<MonthData[]> {
    let newUrl = this.searchurl;
    if(name) {
      newUrl = this.searchurl + '?name=' + name;
    }

    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Get all data based on details query
  getDataBasedOnDetails(key: string, value: string): Observable<MonthData[]> {
    let newUrl = this.searchurl + '/details' + '?key=' + key + '&value=' + value;
    return this.http
      .get(newUrl)
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
