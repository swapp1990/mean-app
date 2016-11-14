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
import {CounterData} from "../../models/counter";

@Component({
  selector: 'tasks-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
             <span style="{'display':'inline-block'}">
                    <button pButton type="button" (click)="onClickLeft()" icon="fa-angle-double-left" iconPos="left"></button>
                    <button pButton type="button" (click)="onClickRight()" icon="fa-angle-double-right" iconPos="right"></button>
                    <h3>{{selectedMonth}}</h3>
             </span>
             <p-accordion>
                 <p-accordionTab *ngFor="let cat of taskCategories">
                    <header>
                        <div class="text-xs-center" id="example-caption-3">{{cat.label}}</div>
                        <progress class="progress" value="50" max="100" aria-describedby="example-caption-3"></progress>
                    </header>
                    <!--<my-data-table [files]="cat.data" -->
                        <!--[dataColumns] = "dataColumns"-->
                        <!--(updateRow)="onUpdateRow($event)"-->
                        <!--(deleteEvent)="onDeleteRow($event)">-->
                    <!--</my-data-table>-->
                    <!--<button pButton type="text" (click)="onCreate(cat)" icon="fa-plus"></button>-->
                    <p-tree [value]="cat.tree" selectionMode="single" (onNodeSelect)="nodeSelect($event)">
                      <template let-node  pTemplate type="checkbox">
                        <p-checkbox name="node.counter" [(ngModel)]="node.isFinished"
                                    binary="false" label="{{node.label}}"
                                    (onChange)="checkBoxSelected(cat.data, node)"></p-checkbox>
                        <input type="number" pInputText [(ngModel)]="node.date"/>
                      </template>
                      <template let-node  pTemplate type="checked">
                        <p-checkbox name="node.counter" [(ngModel)]="node.isFinished"
                                    binary="true" label="{{node.label}}"></p-checkbox>
                        <input type="text" pInputText
                              size = "5"
                              [(ngModel)]="node.originalData.percentageGot"
                              [disabled]="node.disabled" />
                        <input type="text" pInputText
                              size = "5"
                              [(ngModel)]="node.originalData.datePerformed"
                              [disabled]="node.disabled" />
                      </template>
                    </p-tree>
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
      this.taskCategories.push({label: category, data: [], tree: []});
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
            cat.tree = this.convertToTree(cat.data);
            //console.log(cat.tree);
            //Update percentage
            this.updatePercentage(cat.data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  convertToTree(taskData: TaskData[]) {
    let treeData: TreeNode[] = [];
    //console.log(taskData);
    taskData.map((task: TaskData) => {
      let singleData: any = { label: task.name,
                              data: task.name,
                              type: "default",
                              expandedIcon: "fa-folder-open",
                              collapsedIcon: "fa-folder",
                              children: []};
      for(let i = 0; i < task.counters.length; i++) {
        let counterVm: any = task.counters[i];
        if(counterVm.counter) {
          console.log(counterVm);
          let counterBody: CounterData = new CounterData(task._id, (i+1), counterVm.datePerformed, counterVm.percentageGot);
          let childNode: any = this.convertToTreeData(task.name, "checked", counterBody, true);
          singleData.children.push(childNode);
        }
      }

      treeData.push(singleData);
    });
    return treeData;
  }

  convertToTreeData(label: string, type: string, data: any, isFinished: boolean) {
    let treeData: any = {label: data.counter, data: label, type: type, originalData: data, isFinished: isFinished, disabled: true};
    return treeData;
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

  nodeSelect(event) {
    //console.log("node select");
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

  checkBoxSelected(cat: TaskData[], node: any) {
    console.log(cat);
    console.log(node);
    this.taskService.createCounterData(node.originalData.parentId, node.originalData);
  }

  onSelectedMonth(event) {
  }

  onClickRight() {

  }

  onClickLeft() {

  }
}
