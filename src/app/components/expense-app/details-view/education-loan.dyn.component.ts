import {Component, OnInit, Injector} from '@angular/core';
import { Router } from '@angular/router';
import {MonthlyService} from "../../../services/months.service";
import {MonthData} from "../../../models/month";
import {Month} from "../../../enums/months";

@Component({
  selector: 'education-loan',
  template: `<div> Total Loan: {{totalEducationLoan}}</div>
             <div> Paid Till Now: {{educationLoanPaid}}</div>
             <my-progress-bar [showNum]="percentagePaid"></my-progress-bar>
            `
})
export class EducationLoan implements OnInit {

  totalEducationLoan: number = 2000000; //Should come from database
  educationLoanPaid: number = 1;
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
    //console.log("Percentage ", this.percentagePaid);
  }
}
