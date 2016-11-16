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
import {TreeNodeData} from "../utils/tree/treeNode";

@Component({
  selector: 'tasks-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
             <span style="{'display':'inline-block'}">
                    <button pButton type="button" (click)="onClickLeft()" icon="fa-angle-double-left" iconPos="left"></button>
                    <button pButton type="button" (click)="onClickRight()" icon="fa-angle-double-right" iconPos="right"></button>
                    <h3>{{selectedMonth}}</h3>
             </span>
             <s-tree [treeData]="taskDataAsTree"></s-tree>
             <!--<p-accordion>-->
                 <!--<p-accordionTab *ngFor="let cat of taskCategories">-->
                    <!--<header>-->
                        <!--<div class="text-xs-center" id="example-caption-3">{{cat.label}}</div>-->
                         <!--<progress class="progress" value="{{cat.finalPercentage}}" max="100" aria-describedby="example-caption-3"></progress>           -->
                    <!--</header>-->
                    <!--&lt;!&ndash;<my-data-table [files]="cat.data" &ndash;&gt;-->
                        <!--&lt;!&ndash;[dataColumns] = "dataColumns"&ndash;&gt;-->
                        <!--&lt;!&ndash;(updateRow)="onUpdateRow($event)"&ndash;&gt;-->
                        <!--&lt;!&ndash;(deleteEvent)="onDeleteRow($event)">&ndash;&gt;-->
                    <!--&lt;!&ndash;</my-data-table>&ndash;&gt;-->
                    <!--&lt;!&ndash;<button pButton type="text" (click)="onCreate(cat)" icon="fa-plus"></button>&ndash;&gt;-->
                    <!--<p-tree [value]="cat.tree" selectionMode="single" (onNodeSelect)="nodeSelect($event)">-->
                      <!--<template let-node  pTemplate type="task-head">-->
                          <!--<div class="text-xs-center" id="example-caption-3">{{node.label}}</div>-->
                          <!--<progress class="progress" value="{{node.percentageAvg}}" max="{{node.percentage}}" aria-describedby="example-caption-3"></progress>-->
                      <!--</template>-->
                      <!--<template let-node  pTemplate type="checkbox">-->
                        <!--<p-checkbox name="node.counter" [(ngModel)]="node.isFinished"-->
                                    <!--binary="false" label="{{node.label}}"-->
                                    <!--(onChange)="checkBoxSelected(cat.data, node)"></p-checkbox>-->
                        <!--<input type="number" pInputText [(ngModel)]="node.date"/>-->
                      <!--</template>-->
                      <!--<template let-node  pTemplate type="checked-needed">-->
                        <!--<div class="alert alert-warning">-->
                            <!--<p-checkbox name="node.counter" [(ngModel)]="node.isFinished"-->
                                        <!--binary="true" label="{{node.label}}"></p-checkbox>-->
                            <!--<input type="text" pInputText-->
                                  <!--size = "5"-->
                                  <!--[(ngModel)]="node.originalData.percentageGot"-->
                                  <!--[disabled]="node.disabled" />-->
                            <!--<input type="text" pInputText-->
                                  <!--size = "5"-->
                                  <!--[(ngModel)]="node.originalData.datePerformed"-->
                                  <!--[disabled]="node.disabled" />-->
                        <!--</div>-->
                      <!--</template>-->
                      <!--<template let-node  pTemplate type="checked-more">-->
                        <!--<div class="alert alert-success">-->
                            <!--<p-checkbox name="node.counter" [(ngModel)]="node.isFinished"-->
                                        <!--binary="true" label="{{node.label}}"></p-checkbox>-->
                            <!--<input type="text" pInputText-->
                                  <!--size = "5"-->
                                  <!--[(ngModel)]="node.originalData.percentageGot"-->
                                  <!--[disabled]="node.disabled" />-->
                            <!--<input type="text" pInputText-->
                                  <!--size = "5"-->
                                  <!--[(ngModel)]="node.originalData.datePerformed"-->
                                  <!--[disabled]="node.disabled" />-->
                        <!--</div>-->
                      <!--</template>-->
                      <!--<template let-node  pTemplate type="checked-not">-->
                        <!--<div class="alert alert-danger">-->
                            <!--<p-checkbox name="node.counter" [(ngModel)]="node.isFinished"-->
                                        <!--binary="true" label="{{node.label}}"></p-checkbox>-->
                            <!--<input type="text" pInputText-->
                                  <!--size = "5"-->
                                  <!--[(ngModel)]="node.originalData.percentageGot"-->
                                  <!--[disabled]="node.disabled" />-->
                            <!--<input type="text" pInputText-->
                                  <!--size = "5"-->
                                  <!--[(ngModel)]="node.originalData.datePerformed"-->
                                  <!--[disabled]="node.disabled" />-->
                        <!--</div>-->
                      <!--</template>-->
                    <!--</p-tree>-->
                 <!--</p-accordionTab>-->
             <!--</p-accordion>-->
              `
})

export class TasksComponent implements OnInit {
  months: SelectItem[];
  taskCategories: any[];
  selectedMonth: string;
  selectedMonthIndex: number = 10;

  dataColumns: any[];
  taskDataAsTree: TreeNodeData[];

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
    this.taskDataAsTree = [];
    this.taskCategories = [];
    EnumUtils.getTaskCategoriesString().map(category => {
      this.taskCategories.push({label: category, finalScore: 0, data: [], tree: []});
    });

    //Convert Task Categories to Tree View
    this.taskCategories.forEach(cat => {
      let treeNodeLabel = cat.label + " (" + cat.finalScore + "/100)";
      this.taskDataAsTree.push(new TreeNodeData(treeNodeLabel, cat));
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

  getTaskDataByCategory() {
    this.taskCategories.forEach(cat => {
      this.taskService.getMonthlyDataByCategory(this.selectedMonth, cat.label)
        .subscribe (
          (taskData: TaskData[]) => {
            cat.data = taskData;
            this.convertToTree(cat.data, cat.label);
            // cat.finalPercentage = 1;
            //Update percentage
            this.updatePercentage(cat.data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  convertToTree(taskData: TaskData[], category: string) {
    let treeNode: TreeNodeData = this.taskDataAsTree.find(node => node.data.label === category);
    taskData.map((singleTask: TaskData) => {
      let treeNodeLabel = singleTask.name + " (0/" + singleTask.percentage + ")";
      let treeNodeData = new TreeNodeData(treeNodeLabel, singleTask);
      treeNode.addChildNode(treeNodeData);
    });
  }


  // convertToTree(taskData: TaskData[]) {
  //   let treeData: TreeNode[] = [];
  //   //console.log(taskData);
  //   taskData.map((task: TaskData) => {
  //     let singleData: any = { label: task.name,
  //                             data: task.name,
  //                             percentage: task.percentage,
  //                             percentageAvg: 0,
  //                             type: "task-head",
  //                             expandedIcon: "fa-folder-open",
  //                             collapsedIcon: "fa-folder",
  //                             children: []};
  //     let intTemp = 0;
  //    //let counterMax = task.
  //     let percentWholeTask = 0;
  //     let countersCompleted = 0;
  //     if(task.counterMax > task.counters.length) {
  //       for(let i = 0; i < task.counterMax; i++) {
  //         let counterBody: CounterData = new CounterData(task._id, i+1, 0, 0);
  //         let childNode: any = this.convertToTreeData(task.name, "checked-not", counterBody, false);
  //         singleData.children.push(childNode);
  //       }
  //     }
  //     for(let i = 0; i < task.counters.length; i++) {
  //       let counterVm: any = task.counters[i];
  //       if(counterVm.counter) {
  //         intTemp++;
  //         //console.log(counterVm);
  //         if(intTemp <= task.counterMax) {
  //           countersCompleted++;
  //           let counterBody: CounterData = new CounterData(task._id, intTemp, counterVm.datePerformed, counterVm.percentageGot);
  //           let childNode: any = this.convertToTreeData(task.name, "checked-needed", counterBody, true);
  //           singleData.children.push(childNode);
  //         } else {
  //           let counterBody: CounterData = new CounterData(task._id, intTemp, counterVm.datePerformed, counterVm.percentageGot);
  //           let childNode: any = this.convertToTreeData(task.name, "checked-more", counterBody, true);
  //           singleData.children.push(childNode);
  //         }
  //       }
  //     }
  //     percentWholeTask = (countersCompleted/task.counterMax) * 100;
  //     //console.log(percentWholeTask);
  //     percentWholeTask = (percentWholeTask * task.percentage) / 100;
  //     //console.log("A: ", percentWholeTask);
  //     singleData.percentageAvg = percentWholeTask;
  //     treeData.push(singleData);
  //   });
  //   return treeData;
  // }

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
