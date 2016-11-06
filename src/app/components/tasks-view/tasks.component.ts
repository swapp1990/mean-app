import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode, SelectItem} from "primeng/primeng";

import {MonthlyService} from "../../services/months.service";
import {EnumUtils} from "../../enums/EnumUtils";
import {Month} from "../../enums/months";
import {TaskService} from "../../services/tasks.service";
import {TaskData} from "../../models/task";

@Component({
  selector: 'tasks-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
             <span style="{'display':'inline-block'}">
                    <button pButton type="button" (click)="onClickLeft()" icon="fa-angle-double-left" iconPos="left"></button>
                    <button pButton type="button" (click)="onClickRight()" icon="fa-angle-double-right" iconPos="right"></button>
                    <h3>{{selectedMonth}}</h3>
             </span>
             <p-accordion>
                 <p-accordionTab *ngFor="let cat of taskCategories" header="I.......{{cat}}">
                    <my-data-table [files]="data" 
                        [dataColumns] = "dataColumns"
                        (updateRow)="onUpdateRow($event)"
                        (deleteEvent)="onDeleteRow($event)">
                    </my-data-table>
                    <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
                 </p-accordionTab>                             
             </p-accordion>
              `
})

export class TasksComponent implements OnInit {
  months: SelectItem[];
  taskCategories: string[];
  selectedMonth: string;
  selectedMonthIndex: number = 10;

  dataColumns: any[];
  @Input() data: TaskData[];

  constructor(
    private http: Http,
    private router: Router,
    private taskService: TaskService) {

  }

  initializeMonths() {
    this.selectedMonth = Month[this.selectedMonthIndex-1];
    this.months = [];
    EnumUtils.getMonthsString().map(month => {
      this.months.push({label: month, value: month});
    });
  }

  initializeCategories() {
    this.taskCategories = [];
    EnumUtils.getTaskCategoriesString().map(category => {
      this.taskCategories.push(category);
    });
  }

  initializeColumns() {
    this.dataColumns = [];
    this.dataColumns.push({name: 'Name', field: 'name', cache: null});
    this.dataColumns.push({name: 'Required Counter', field: 'counterMax', cache: null});
    this.dataColumns.push({name: 'Percentage', field: 'percentage', cache: null});
  }

  ngOnInit(): void {
    this.initializeMonths();
    this.initializeCategories();
    this.initializeColumns();
    this.getTaskDataByCategory();
  }

  getTaskDataByCategory() {
    this.taskService.getAllTasksData()
      .subscribe (
        taskData => {
          this.data = taskData;
          console.log(this.data);
        },
        err => {
          console.log(err);
        }
      );
  }

  onCreate($event) {
    let emptyData: TaskData = new TaskData();
    console.log(emptyData);
    this.taskService.createTaskData(emptyData)
      .subscribe(
        data => {
          //console.log("Create" + data);
          this.getTaskDataByCategory();
          //this.calculateTotalSpent();
        },
        err => {console.log(err);}
      );
  }

  onSelectedMonth(event) {
  }

  onClickRight() {

  }

  onClickLeft() {

  }
}
