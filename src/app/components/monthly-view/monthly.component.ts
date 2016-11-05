import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode, SelectItem} from "primeng/primeng";

import {MonthlyService} from "../../services/months.service";
import {MonthData} from "../../models/month";
import {Category} from "../../models/catagory";
import {EnumUtils} from "../../enums/EnumUtils";
import {Month} from "../../enums/months";

@Component({
  selector: 'monthly-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
             <span style="{'display':'inline-block'}">
                    <button pButton type="button" (click)="onClickLeft()" icon="fa-angle-double-left" iconPos="left"></button>
                    <button pButton type="button" (click)="onClickRight()" icon="fa-angle-double-right" iconPos="right"></button>
                    <h3>{{selectedMonth}}</h3>
             </span>
             <p-accordion>
                 <p-accordionTab header="I.......Expense - {{totalExpense}}">
                      <monthly-type-view [type]="'Expense'"
                                         [selectedMonth]="selectedMonth"
                                         (totalAmountOutput)="onTotalChange($event)"></monthly-type-view>
                 </p-accordionTab>                

                 <p-accordionTab header="I.......Income - {{totalIncome}}">
                      <monthly-type-view [type]="'Income'"
                                         [selectedMonth]="selectedMonth"
                                         (totalAmountOutput)="onTotalChange($event)"></monthly-type-view>
                 </p-accordionTab>                
             </p-accordion>
              `
})

export class MonthlyComponent implements OnInit {
  months: SelectItem[];
  totalExpense: number = 0;
  totalIncome: number = 0;
  expenseCategories: Category[];
  incomeCategories: Category[];
  dataColumns: any[];
  namesCache: any[];
  selectedMonth: string;
  expenseData: MonthData[];
  incomeData: MonthData[];
  selectedExpenseCategory: string;
  selectedIncomeCategory: string;
  totalCategory: number = 0;
  totalAmountMonthly: number = 0;
  error: any;
  response: any;

  constructor(
    private http: Http,
    private router: Router,
    private monthlyService: MonthlyService) {

  }

  initializeMonths() {
    this.selectedMonth = Month[Month.October];
    this.months = [];
    EnumUtils.getMonthsString().map(month => {
      this.months.push({label: month, value: month});
    });
  }

  // resetCategoryTotalSpent() {
  //   this.totalAmountMonthly = 0;
  //   this.expenseCategories.map((category: Category) => {
  //       category.monthlySpent = 0;
  //   });
  // }

  ngOnInit(): void {
    this.initializeMonths();
    //this.initializeCategories();
    //this.getMonthlyDataByCategory();
    this.getAllCategoryNames();
  }

  onTotalChange(event: any) {
    console.log("E: " + event.type);
    if(event.type === "Expense") {
      this.totalExpense = event.totalAmount;
      this.totalExpense = Math.ceil(this.totalExpense/100)*100;
    } else {
      this.totalIncome = event.totalAmount;
      this.totalIncome = Math.ceil(this.totalIncome/100)*100;
    }

  }


  getAllCategoryNames() {
    this.monthlyService.getAllNamesByCategory(this.selectedExpenseCategory, this.selectedMonth)
      .subscribe (
        body => {
          this.namesCache = body;
          console.log(this.namesCache);
          //this.initializeColumns();
        },
        err => {
          console.log(err);
        }
      );
  }

  getAllMonthlyData() {
    this.monthlyService.getMonthlyData()
      .subscribe (
        monthlyData => {
          this.expenseData = monthlyData;
        },
        err => {
          console.log(err);
        }
      );
  }

  onSelectedMonth(event) {
    //this.getMonthlyDataByCategory();
    //this.calculateTotalSpent();
  }

  onClickRight() {
    if(this.selectedMonth === 'September') {
      this.selectedMonth = 'October';
    }
    //this.getMonthlyDataByCategory();
    //this.calculateTotalSpent();
  }

  onClickLeft() {
    if(this.selectedMonth === 'October') {
      this.selectedMonth = 'September';
    }
    //this.getMonthlyDataByCategory();
    //this.calculateTotalSpent();
  }

  onSave($event) {
    setTimeout(() => {
      //this.getMonthlyDataByCategory();
      //this.calculateTotalSpent();
      this.totalCategory = 0;
    }, 100);
    this.expenseData.map((body: MonthData) => {
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

  onChangeToggle(event: Object) {
    this.expenseData.map((body: MonthData) => {
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
}
