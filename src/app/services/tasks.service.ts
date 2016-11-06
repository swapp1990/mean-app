import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {environment} from "../../environments/environment";
import {Hotel} from "../models/hotel";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {TaskData} from "../models/task";

@Injectable()
export class TaskService {
  private tasksUrl = environment.server +'/api/tasks';  // URL to web api

  constructor(private http: Http) { }

  //Get all tasks data
  getAllTasksData(): Observable<TaskData[]> {
    return this.http
      .get(this.tasksUrl)
      .map((response: Response) => response.json());
  }

  //Get monthly data for category types
  getMonthlyDataByCategory(category: string, month: string): Observable<TaskData[]> {
    let newUrl = this.tasksUrl + '?category='+ month+'&month='+ category;
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  getTaskDataByMonth(month: string): Observable<TaskData[]> {
    let newUrl = this.tasksUrl + '?month='+ month;
    return this.http
      .get(newUrl)
      .map((response: Response) => response.json());
  }

  //Create Task Data.
  createTaskData(taskBody: TaskData) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.tasksUrl, JSON.stringify(taskBody), { headers: headers })
      .map((response: Response) => response.json());
  }

  //Update Task Data.
  updateTaskData(taskDataId: string, taskBody: TaskData) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let newUrl = this.tasksUrl + '/'+ taskDataId;
    return this.http
      .put(newUrl, JSON.stringify(taskBody), { headers: headers })
      .map((response: Response) => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
