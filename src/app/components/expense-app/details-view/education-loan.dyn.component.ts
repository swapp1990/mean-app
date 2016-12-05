import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MonthlyService} from "../../../services/months.service";
import {MonthData} from "../../../models/month";

@Component({
  selector: 'education-loan',
  template: `<div> Total Loan: {{totalEducationLoan}}</div>
             <div> Paid: {{educationLoanPaid}} - Last Paid {{lastPaid}}</div>
             <my-progress-bar [showNum]="percentagePaid"></my-progress-bar>
            `
})
export class EducationLoan implements OnInit {

  totalEducationLoan: number = 2000000; //Should come from database
  educationLoanPaid: number = 1;
  lastPaid: string = "";
  percentagePaid: number = 0;

  constructor(private monthlyService: MonthlyService) {

  }

  ngOnInit(): void {
    this.getDataBySearchTag();
  }

  getDataBySearchTag() {
    this.monthlyService.getAllDataBasedOnQuery("India Education Loan")
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
    this.educationLoanPaid = 0;
    monthlyData.forEach((monthData: MonthData) => {
      if (monthData.details) {
        monthData.details.forEach(detail => {
          let columns: string[] = Object.keys(detail);
          columns.forEach(colDetail => {
            if(colDetail === "For Loan") {
              let paidAmount: number = +detail[colDetail];
              //console.log(paidAmount);
              this.educationLoanPaid += paidAmount;
              this.calculatePercent();
            }
          });
        });
      }
    });
  }

  calculatePercent() {
    this.percentagePaid = 100 - Math.round(((this.totalEducationLoan - this.educationLoanPaid)/this.totalEducationLoan)*100);
    console.log(this.percentagePaid);
  }
}
