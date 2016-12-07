import {Component, OnInit, Injector} from '@angular/core';
import { Router } from '@angular/router';
import {MonthlyService} from "../../../services/months.service";
import {MonthData} from "../../../models/month";
import {Month} from "../../../enums/months";

@Component({
  selector: 'car-loan',
  template: `<div> Total Loan: {{totalCarLoan}}</div>
             <div> Paid Till Now: {{carLoanPaid}}</div>
             <my-progress-bar [showNum]="percentagePaid"></my-progress-bar>
            `
})
export class CarLoan implements OnInit {

  totalCarLoan: number = 15000; //Should come from database
  carLoanPaid: number = 1;
  lastPaid: string = "";
  percentagePaid: number = 0;

  selectedMonth: string = "";
  constructor(private monthlyService: MonthlyService, private injector: Injector) {
    this.selectedMonth = this.injector.get('selectedMonth');
  }

  ngOnInit(): void {
    this.getDataBySearchTag();
  }

  getDataBySearchTag() {
    this.monthlyService.getAllDataBasedOnQuery("Car Loan")
      .subscribe (
        monthlyData => {
          this.updatePaidAmount(monthlyData);
        },
        err => {
          console.log(err);
        }
      );
  }

  updatePaidAmount(monthlyData: MonthData[]) {
    this.carLoanPaid = 0;
    if(this.selectedMonth != "") {
      monthlyData = monthlyData.filter((monthData: MonthData) => {
        return Month[monthData.month] <= Month[this.selectedMonth];
      });
      //console.log("Filtered ", monthlyData.length);
    }

    monthlyData.forEach((monthData: MonthData) => {
      if (monthData.details) {
        monthData.details.forEach(detail => {
          let columns: string[] = Object.keys(detail);
          columns.forEach(colDetail => {
            if(colDetail === "For Loan") {
              let paidAmount: number = +detail[colDetail];
              //console.log(paidAmount);
              this.carLoanPaid += paidAmount;
              this.calculatePercent();
            }
          });
        });
      }
    });
  }

  calculatePercent() {
    this.percentagePaid = 100 - Math.round(((this.totalCarLoan - this.carLoanPaid)/this.totalCarLoan)*100);
    //console.log("Percentage ", this.percentagePaid);
  }
}
