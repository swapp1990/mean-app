import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {HotelService} from "../../services/hotels.service";
import {Hotel} from "../../models/hotel";
import {TreeNode} from "primeng/primeng";
import {MonthlyService} from "../../services/months.service";
import {MonthData} from "../../models/month";

@Component({
  selector: 'monthly-view',
  template: `<p-tabView orientation="left">
    <p-tabPanel header="Grocery">
        <my-data-table [files]="monthlyData" (changeToggle)="onChangeToggle($event)"></my-data-table>
    </p-tabPanel>
    <p-tabPanel header="Food">
        <my-data-table [files]="monthlyData"></my-data-table>
    </p-tabPanel>
    <p-tabPanel header="Entertainment">
        <my-data-table [files]="monthlyData"></my-data-table>    
    </p-tabPanel>
   
</p-tabView>`
})
export class MonthlyComponent implements OnInit {
  monthlyData: MonthData[];
  error: any;
  response: any;
  files: TreeNode[];
  dataGrocery: TreeNode[];
  dataFood: TreeNode[];
  dataEntertainment: TreeNode[];
  observable$: Observable<{}>;

  constructor(
    private http: Http,
    private router: Router,
    private monthlyService: MonthlyService) {

  }

  ngOnInit(): void {
    // this.getFileSystem().then(files => {
    //   this.files = files;
    //   this.dataGrocery = this.files.filter((row) => row.data.category === "Grocery");
    //   this.dataFood = this.files.filter((row) => row.data.category === "Food");
    //   this.dataEntertainment = this.files.filter((row) => row.data.category === "Entertainment");
    // });

    this.monthlyService.getMonthlyData()
      .subscribe (
        monthlyData => {
          this.monthlyData = monthlyData;
        },
        err => {
          console.log(err);
        }
      );
  }

  onChangeToggle($event) {
    console.log("edit");
    this.monthlyData.map((body: MonthData) => {
      if(body._id) {
        this.monthlyService.updateMonthlyData(body._id, body)
          .subscribe(
            data => {
              console.log("OK" + data);
              },
            err => {console.log(err);}
          );
      }
    });
  }

  private getFileSystem() {
    return this.http.get('../assets/october2.json')
      .toPromise()
      .then(res => <TreeNode[]> res.json().data)
      .then(data => { return data; });
  }
}
