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

  }

  ngOnInit(): void {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
