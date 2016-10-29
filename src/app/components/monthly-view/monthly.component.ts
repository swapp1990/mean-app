import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {HotelService} from "../../services/hotels.service";
import {Hotel} from "../../models/hotel";
import {TreeNode, SelectItem} from "primeng/primeng";
import {MonthlyService} from "../../services/months.service";
import {MonthData} from "../../models/month";

@Component({
  selector: 'monthly-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
              <p-tabView orientation="left" (onChange)="onTabChange($event)">
                <p-tabPanel header="Grocery">
                    <my-data-table [files]="monthlyData" 
                      [totalCategory]="totalCategory"
                      (changeToggle)="onChangeToggle($event)" 
                      (deleteEvent)="onDeleteRow($event)">
                    </my-data-table>
                    <button pButton type="text" (click)="onCreateToggle($event)" icon="fa-plus"></button>
                </p-tabPanel>
                <p-tabPanel header="Food">
                   <my-data-table [files]="monthlyData" 
                      [totalCategory]="totalCategory"
                      (changeToggle)="onChangeToggle($event)" 
                      (deleteEvent)="onDeleteRow($event)">
                    </my-data-table>
                    <button pButton type="text" (click)="onCreateToggle($event)" icon="fa-plus"></button>
                </p-tabPanel>
                <p-tabPanel header="Entertainment">
                    <my-data-table [files]="monthlyData"
                      [totalCategory]="totalCategory"
                      (changeToggle)="onChangeToggle($event)" 
                      (deleteEvent)="onDeleteRow($event)">
                    </my-data-table>
                    <button pButton type="text" (click)="onCreateToggle($event)" icon="fa-plus"></button>
                </p-tabPanel>
             </p-tabView>`
})

export class MonthlyComponent implements OnInit {
  months: SelectItem[];
  selectedMonth: string;
  monthlyData: MonthData[];
  category: string = "Grocery";
  totalCategory: number = 0;
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
      this.initializeMonths();
  }

  initializeMonths() {
    this.selectedMonth = 'October';
    this.months = [];
    this.months.push({label: 'January', value: 'January'});
    this.months.push({label: 'February', value: 'February'});
    this.months.push({label: 'March', value: 'March'});
    this.months.push({label: 'April', value: 'April'});
    this.months.push({label: 'May', value: 'May'});
    this.months.push({label: 'June', value: 'June'});
    this.months.push({label: 'July', value: 'July'});
    this.months.push({label: 'August', value: 'August'});
    this.months.push({label: 'September', value: 'September'});
    this.months.push({label: 'October', value: 'October'});
    this.months.push({label: 'November', value: 'November'});
    this.months.push({label: 'December', value: 'December'});
  }

  ngOnInit(): void {
    // this.getFileSystem().then(files => {
    //   this.files = files;
    //   this.dataGrocery = this.files.filter((row) => row.data.category === "Grocery");
    //   this.dataFood = this.files.filter((row) => row.data.category === "Food");
    //   this.dataEntertainment = this.files.filter((row) => row.data.category === "Entertainment");
    // });
    this.getMonthlyDataByCategory();
  }

  onSelectedMonth(event) {
    this.getMonthlyDataByCategory();
  }

  onTabChange(event) {
    //console.log(event);
    if(event.index == 0) {
      this.category = "Grocery";
    } else if(event.index == 1) {
      this.category = "Food";
    } else {
      this.category = "Entertainment";
    }
    this.getMonthlyDataByCategory();
  }

  getAllMonthlyData() {
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

  getMonthlyDataByCategory() {
    this.totalCategory = 0;
    console.log(this.selectedMonth);
    this.monthlyService.getMonthlyDataByCategory(this.category, this.selectedMonth)
      .subscribe (
        monthlyData => {
          this.monthlyData = monthlyData;
          this.monthlyData.map((body: MonthData) => {
            this.totalCategory += body.price;
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  onCreateToggle($event) {
    let emptyData: MonthData = new MonthData(this.category);
    console.log(emptyData);
    this.monthlyService.createMonthData(emptyData)
      .subscribe(
            data => {
              console.log("Create" + data);
              this.getMonthlyDataByCategory();
            },
            err => {console.log(err);}
          );
  }

  onChangeToggle($event) {
    this.monthlyData.map((body: MonthData) => {
      if(body._id) {
        this.monthlyService.updateMonthlyData(body._id, body)
          .subscribe(
            data => {
              //console.log("OK" + data);
              },
            err => {console.log(err);}
          );
      }
    });
  }

  onDeleteRow(event: MonthData) {
    this.monthlyService.deleteMonthlyData(event._id)
      .subscribe (
        data => {
          console.log("Delete " + data);
          this.getAllMonthlyData();
        },
        err => {
          console.log(err);
        }
      );
  }
  //
  // private getFileSystem() {
  //   return this.http.get('../assets/october2.json')
  //     .toPromise()
  //     .then(res => <TreeNode[]> res.json().data)
  //     .then(data => { return data; });
  // }
}
