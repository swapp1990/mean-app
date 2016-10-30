import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode} from "primeng/primeng";
import {MonthlyService} from "../../services/months.service";
import {Month} from "../../enums/months";
import {EnumUtils} from "../../enums/EnumUtils";

@Component({
  selector: 'monthly-graph',
  template: `<button pButton type="text" (click)="onSwitch($event)" icon="fa-sort-amount-desc"></button>
             <p-chart *ngIf='!switched' type="bar" [data]="data"></p-chart>
             <p-chart *ngIf='switched' type="bar" [data]="switchData"></p-chart>`
})
export class MonthlyGraphView implements OnInit {
  data: any;
  switched: boolean = false;
  switchData: any;

  constructor(
    private http: Http,
    private monthlyService: MonthlyService) {

  }

  onSwitch() {
    this.switched = !this.switched;
    this.intializeDataTwo();
    this.setDataForGraphTwo();
  }

  intializeDataOne() {
    let months: string[] = EnumUtils.getMonthsString();
    this.data = {
      labels: months,
      datasets: [
        {
          label: 'Food',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          label: 'Grocery',
          backgroundColor: '#42f456',
          borderColor: '#46f25a',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          label: 'Entertainment',
          backgroundColor: '#e52424',
          borderColor: '#ed2a2a',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  }

  intializeDataTwo() {
    let categories: string[] = EnumUtils.getCategoriesString();

    this.switchData = {
      labels: categories,
      datasets: [
        {
          label: 'August',
          data: [0, 0, 0]
        },
        {
          label: 'September',
          data: [0, 0, 0]
        },
        {
          label: 'October',
          data: [0, 0, 0]
        }
      ]
    }
  }

  setDataForGraphTwo() {
    this.monthlyService.monthGetAllCostByCategory()
      .subscribe (
        monthlyData => {
          //console.log(monthlyData);
          monthlyData.map(body => {
            //this.data = body;
            this.switchData.datasets.map(dataset => {
              //console.log(dataset);
              if(body._id.month === dataset.label) {
                //console.log(body._id.month + " Label" + dataset.label);
                dataset.data[this.getIndexForCategory(body._id.category)] = body.balance;
              }
            });
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.intializeDataOne();
    this.monthlyService.monthGetAllCostByCategory()
      .subscribe (
        monthlyData => {
          //console.log(monthlyData);
          monthlyData.map(body => {
            //this.data = body;
            this.data.datasets.map(dataset => {
              //console.log(dataset);
              if(body._id.category === dataset.label) {
                //console.log(body._id.month + " Label" + dataset.label);
                dataset.data[Month[body._id.month]] = body.balance;
              }
            });
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  getIndexForCategory(category: string) {
    if(category === "Food") {return 0;}
    if(category === "Grocery") {return 1;}
    if(category === "Entertainment") {return 2;}
  }
}
