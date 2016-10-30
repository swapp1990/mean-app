import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {HotelService} from "../../services/hotels.service";
import {Hotel} from "../../models/hotel";
import {TreeNode, SelectItem} from "primeng/primeng";
import {MonthlyService} from "../../services/months.service";
import {MonthData} from "../../models/month";
import {Category} from "../../models/catagory";

@Component({
  selector: 'monthly-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
              <h2>Total Spent: {{totalSpentMonthly}}</h2>
              <p-tabView orientation="left" (onChange)="onTabChange($event)">
                <p-tabPanel *ngFor="let categoryB of categories" header="{{getCategoryHeader(categoryB)}}">
                    <my-data-table [files]="monthlyData" 
                      [dataColumns] = "dataColumns"
                      [totalCategory]="totalCategory"
                      (changeToggle)="onChangeToggle($event)" 
                      (updateRow)="onUpdateRow($event)"
                      (deleteEvent)="onDeleteRow($event)">
                    </my-data-table>
                    <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
                    <button pButton type="text" (click)="onSave($event)" icon="fa-check"></button>
                </p-tabPanel>
                <!--<p-tabPanel header="Food">-->
                   <!--<my-data-table [files]="monthlyData" -->
                      <!--[totalCategory]="totalCategory"-->
                      <!--(changeToggle)="onChangeToggle($event)" -->
                      <!--(deleteEvent)="onDeleteRow($event)">-->
                    <!--</my-data-table>-->
                    <!--<button pButton type="text" (click)="onCreateToggle($event)" icon="fa-plus"></button>-->
                <!--</p-tabPanel>-->
                <!--<p-tabPanel header="Entertainment">-->
                    <!--<my-data-table [files]="monthlyData"-->
                      <!--[totalCategory]="totalCategory"-->
                      <!--(changeToggle)="onChangeToggle($event)" -->
                      <!--(deleteEvent)="onDeleteRow($event)">-->
                    <!--</my-data-table>-->
                    <!--<button pButton type="text" (click)="onCreateToggle($event)" icon="fa-plus"></button>-->
                <!--</p-tabPanel>-->
             </p-tabView>`
})

export class MonthlyComponent implements OnInit {
  months: SelectItem[];
  categories: Category[];
  dataColumns: any[];
  namesCache: any[];
  selectedMonth: string;
  monthlyData: MonthData[];
  category: string;
  totalCategory: number = 0;
  totalSpentMonthly: number = 0;
  error: any;
  response: any;

  constructor(
    private http: Http,
    private router: Router,
    private monthlyService: MonthlyService) {

  }

  initializeColumns() {
    this.dataColumns = [];
    this.dataColumns.push({name: 'Date', field: 'date', cache: null});
    this.dataColumns.push({name: 'Name', field: 'name', cache: this.namesCache});
    this.dataColumns.push({name: 'Cost', field: 'price', cache: null});
    this.dataColumns.push({name: 'Payment', field: 'payment', cache: null});
  }

  initializeCategories() {
    this.categories = [];
    this.namesCache = [];
    this.categories.push({name: 'Rent', monthlySpent: 0});
    this.categories.push({name: 'Utilities', monthlySpent: 0});
    this.categories.push({name: 'Loan', monthlySpent: 0});
    this.categories.push({name: 'Grocery', monthlySpent: 0});
    this.categories.push({name: 'Food', monthlySpent: 0});
    this.categories.push({name: 'Coffee', monthlySpent: 0});
    this.categories.push({name: 'Transport', monthlySpent: 0});
    this.categories.push({name: 'Entertainment', monthlySpent: 0});
    this.categories.push({name: 'Fitness', monthlySpent: 0});
    this.categories.push({name: 'Education', monthlySpent: 0});
    this.categories.push({name: 'Furniture', monthlySpent: 0});
    this.categories.push({name: 'Clothes', monthlySpent: 0});
    this.category = this.categories[0].name;
    this.calculateTotalSpent();
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

  getCategoryHeader(categoryBody: Category) {
    return categoryBody.name + " - " + categoryBody.monthlySpent;
  }

  //Total Spent for Monthly Data.
  calculateTotalSpent() {
    //console.log(this.selectedMonth);
    this.resetCategoryTotalSpent();
    this.monthlyService.monthGetAllCost(this.selectedMonth)
      .subscribe (
        monthlyData => {
          monthlyData.map(body => {
            //console.log(body);
            this.changeCategoryTotalSpent(body._id.category, body.balance);
            this.totalSpentMonthly += body.balance;
            this.totalSpentMonthly = +Number(this.totalSpentMonthly).toFixed(2);
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  resetCategoryTotalSpent() {
    this.totalSpentMonthly = 0;
    this.categories.map((category: Category) => {
        category.monthlySpent = 0;
    });
  }

  changeCategoryTotalSpent(categoryName: string, totalSpent: number) {
    this.categories.map((category: Category) => {
      if(category.name === categoryName) {
        category.monthlySpent = totalSpent;
        category.monthlySpent = +Number(category.monthlySpent).toFixed(2);
      }
    });
  }

  ngOnInit(): void {
    this.initializeMonths();
    this.initializeCategories();
    this.getMonthlyDataByCategory();
    this.getAllCategoryNames();
  }

  onSelectedMonth(event) {
    this.getMonthlyDataByCategory();
    this.calculateTotalSpent();
  }

  getAllCategoryNames() {
    this.monthlyService.getAllNamesByCategory(this.category, this.selectedMonth)
      .subscribe (
        body => {
          this.namesCache = body;
          console.log(this.namesCache);
          this.initializeColumns();
        },
        err => {
          console.log(err);
        }
      );
  }

  onTabChange(event) {
    //console.log(event);
    this.category = this.categories[event.index].name;
    this.getMonthlyDataByCategory();
    this.getAllCategoryNames();
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
    //console.log(this.selectedMonth);
    this.monthlyService.getMonthlyDataByCategory(this.category, this.selectedMonth)
      .subscribe (
        monthlyData => {
          this.monthlyData = monthlyData;
          this.monthlyData.map((body: MonthData) => {
            this.totalCategory += body.price;
            this.totalCategory = +Number(this.totalCategory).toFixed(2);
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  onCreate($event) {
    let emptyData: MonthData = new MonthData(this.category, this.selectedMonth);
    console.log(emptyData);
    this.monthlyService.createMonthData(emptyData)
      .subscribe(
            data => {
              //console.log("Create" + data);
              this.getMonthlyDataByCategory();
              this.calculateTotalSpent();
            },
            err => {console.log(err);}
          );
  }

  onSave($event) {
    setTimeout(() => {
      this.getMonthlyDataByCategory();
      this.calculateTotalSpent();
      this.totalCategory = 0;
    }, 100);
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

  onUpdateRow(event) {
    //console.log(event);
    this.monthlyService.updateMonthlyData(event._id, event)
      .subscribe(
        data => {
          //console.log("OK" + data);
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
