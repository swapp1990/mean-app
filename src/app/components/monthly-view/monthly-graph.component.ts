import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode} from "primeng/primeng";
import {MonthlyService} from "../../services/months.service";

@Component({
  selector: 'monthly-graph',
  template: `<p-chart type="bar" [data]="data"></p-chart>`
})
export class MonthlyGraphView implements OnInit {
  data: any;

  constructor(
    private http: Http,
    private monthlyService: MonthlyService) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Food',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          label: 'Grocery',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  }

  ngOnInit(): void {
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
                dataset.data[this.getIndexForMonth(body._id.month)] = body.balance;
              }
            });
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  getIndexForMonth(month: string) {
    if(month === "September") {return 8;}
    if(month === "October") {return 9;}
  }
}
