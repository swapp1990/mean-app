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
                 <p-accordionTab *ngFor="let cat of taskCategories" header="I.......{{cat.label}}">
                    <my-data-table [files]="cat.data" 
                        [dataColumns] = "dataColumns"
                        (updateRow)="onUpdateRow($event)"
                        (deleteEvent)="onDeleteRow($event)">
                    </my-data-table>
                    <button pButton type="text" (click)="onCreate(cat)" icon="fa-plus"></button>
                 </p-accordionTab>                             
             </p-accordion>
              `
})

export class TasksComponent implements OnInit {
  months: SelectItem[];
  taskCategories: any[];
  selectedMonth: string;
  selectedMonthIndex: number = 10;

  dataColumns: any[];

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
      this.taskCategories.push({label: category, data: []});
    });
  }

  initializeColumns() {
    this.dataColumns = [];
    this.dataColumns.push({name: 'Name', field: 'name', cache: null, editable: true});
    this.dataColumns.push({name: 'Required Counter', field: 'counterMax', cache: null, editable: true});
    this.dataColumns.push({name: 'Percentage', field: 'percentage', cache: null, editable: false});
    this.dataColumns.push({name: 'Weight', field: 'weight', cache: null, editable: true});
  }

  ngOnInit(): void {
    this.initializeMonths();
    this.initializeCategories();
    this.initializeColumns();
    this.getTaskDataByCategory();
  }

  getCategoryData(cat) {

  }

  getTaskDataByCategory() {
    this.taskCategories.forEach(cat => {
      this.taskService.getMonthlyDataByCategory(this.selectedMonth, cat.label)
        .subscribe (
          taskData => {
            cat.data = taskData;
            //Update percentage
            this.updatePercentage(cat.data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  updatePercentage(categoryData: TaskData[]) {
    let totalWeight: number = 0;
    categoryData.map((task: TaskData) => {
      totalWeight += task.weight;
    });

    //console.log(categoryData);
    categoryData.map((task: TaskData) => {
      let eachPercent: number = Math.round((task.weight/totalWeight)*100);
      if(task.percentage != eachPercent) {
        task.percentage = eachPercent;
        this.updateTaskData(task._id, task);
      }
    });
  }


  onCreate(category: any) {
    let categoryArray: string[] = [];
    categoryArray.push(category.label);
    let emptyData: TaskData = new TaskData(this.selectedMonth, categoryArray);
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

  onUpdateRow(event) {
    //console.log(event);
    this.updateTaskData(event._id, event);
  }

  updateTaskData(id: any, taskBody: TaskData) {
    this.taskService.updateTaskData(id, taskBody)
      .subscribe(
        data => {
          //console.log("OK" + data);
          this.taskCategories.map(cat => {
            //console.log("Cat: " + cat.label + "Body: " + taskBody.category[0]);
            if(cat.label === taskBody.category[0]) {
              this.updatePercentage(cat.data);
            }
          });
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
