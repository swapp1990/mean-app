import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode, SelectItem} from "primeng/primeng";
import {MonthlyTypeComponent} from "./monthly-type.component";
import {MonthlyService} from "../../../services/months.service";
import {Month} from "../../../enums/months";
import {EnumUtils} from "../../../enums/EnumUtils";

@Component({
  selector: 'monthly-view',
  template: `<p-dropdown [options]="months" [(ngModel)]="selectedMonth" (onChange)="onSelectedMonth($event)"></p-dropdown>
             <span style="{'display':'inline-block'}">
                    <button pButton type="button" (click)="onClickLeft()" icon="fa-angle-double-left" iconPos="left"></button>
                    <button pButton type="button" (click)="onClickRight()" icon="fa-angle-double-right" iconPos="right"></button>
                    <h3>{{selectedMonth}} - Saved: {{totalSaved}} </h3>
             </span>
             <p-accordion>
                 <p-accordionTab header="I.......Expense - {{totalExpense}} [Once - {{totalExpenseOnce}}]">
                      <monthly-type-view #type1 [type]="'Expense'"
                                         [selectedMonth]="selectedMonth"
                                         (totalAmountOutput)="onTotalChange($event)"></monthly-type-view>
                 </p-accordionTab>                

                 <p-accordionTab header="I.......Income - {{totalIncome}}">
                      <monthly-type-view #type2 [type]="'Income'"
                                         [selectedMonth]="selectedMonth"
                                         (totalAmountOutput)="onTotalChange($event)"></monthly-type-view>
                 </p-accordionTab>                
             </p-accordion>
              `
})

export class MonthlyComponent implements OnInit, AfterViewInit {
  months: SelectItem[];
  selectedMonth: string;
  selectedMonthIndex: number = 11;

  totalExpense: number = 0;
  totalExpenseOnce: number = 0;
  totalIncome: number = 0;
  totalSaved: number = 0;

  @ViewChild('type1')
  firstType: MonthlyTypeComponent;

  @ViewChild('type2')
  secondType: MonthlyTypeComponent;

  constructor(
    private http: Http,
    private router: Router,
    private monthlyService: MonthlyService) {

  }

  initializeMonths() {
    this.selectedMonth = Month[this.selectedMonthIndex-1];
    this.months = [];
    EnumUtils.getMonthsString().map(month => {
      this.months.push({label: month, value: month});
    });
  }

  ngOnInit(): void {
    this.initializeMonths();
  }

  ngAfterViewInit(): void {
    //this.totalExpense = this.firstType.totalAmountByType;
  }

  onTotalChange(event: any) {
    //console.log("E: " + event.totalAmountByType);
    if(event.type === "Expense") {
      this.totalExpense = event.totalAmount;
      this.totalExpense = Math.ceil(this.totalExpense/100)*100;
      this.totalExpenseOnce = event.totalAmountOnce;
      this.totalExpenseOnce = Math.ceil(this.totalExpenseOnce/100)*100;
    } else {
      this.totalIncome = event.totalAmount;
      this.totalIncome = Math.ceil(this.totalIncome/100)*100;
    }
    this.totalSaved = this.totalIncome - this.totalExpense;
  }

  onSelectedMonth(event) {
    this.firstType.onMonthChange(this.selectedMonth);
    this.secondType.onMonthChange(this.selectedMonth);
  }

  onClickRight() {
    if(this.selectedMonthIndex == 12) this.selectedMonthIndex = 0;
    this.selectedMonth = Month[(++this.selectedMonthIndex)-1];
    this.firstType.onMonthChange(this.selectedMonth);
    this.secondType.onMonthChange(this.selectedMonth);
  }

  onClickLeft() {
    if(this.selectedMonthIndex == 0) this.selectedMonthIndex = 11;
    this.selectedMonth = Month[(--this.selectedMonthIndex)-1];
    this.firstType.onMonthChange(this.selectedMonth);
    this.secondType.onMonthChange(this.selectedMonth);
  }
}
