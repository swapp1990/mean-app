import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {isNullOrUndefined} from "util";
import {Category, Amount} from "../../../models/catagory";
import {MonthData} from "../../../models/month";
import {MonthlyService} from "../../../services/months.service";
import {EnumUtils} from "../../../enums/EnumUtils";
import {CategoryView} from "./category-view.component";

@Component({
  selector: 'monthly-type-view',
  template: `
               <p-tabView orientation="left" (onChange)="onCategoryChange($event)">
                  <p-tabPanel *ngFor="let category of categories" header="{{getCategoryHeader(category)}}">
                  </p-tabPanel>
                  <!-- Shows Category View Based on Tab Selected -->
                  <category-view #cv
                          [selectedMonth]="selectedMonth"
                          [selectedCategory]="selectedCategory"
                          [type]="type"
                          (updatedData)="onUpdatedData($event)"></category-view>
               </p-tabView>
            `
})

export class MonthlyTypeComponent implements OnInit {
  @Input() type: string; //Type: Income/Expense
  categories: Category[]; //Category List
  @Output() totalAmountOutput = new EventEmitter();
  totalAmountByType: number = 0;
  totalAmountOnceByType: number = 0;

  selectedCategory: string;
  @Input() selectedMonth: string;

  @ViewChild('cv')
    categoryView: CategoryView;

  namesCache: any[];

  constructor(private monthlyService: MonthlyService) {}

  //TODO: Have to refactor to have primeng view and database view seperated.

  ngOnInit(): void {
    this.initializeCategories();
  }

  //Show Categories
  initializeCategories() {
    this.categories = [];
    if(this.type === "Expense") {
      EnumUtils.getExpenseCategoriesString().map(expense => {
        this.categories.push({name: expense, monthlyAmount: new Amount()});
      });
    } else {
      EnumUtils.getIncomeCategoriesString().map(income => {
        this.categories.push({name: income, monthlyAmount: new Amount()});
      });
    }
    this.selectedCategory = this.categories[0].name;
    this.calculateTotalAmount(this.selectedMonth);
  }

  getCategoryHeader(categoryBody: Category) {
    return categoryBody.name + " - " + categoryBody.monthlyAmount.total + " (" + categoryBody.monthlyAmount.once + ")";
  }

  isSelected(category: string) {
    return category === this.selectedCategory;
  }

  getAllCategoryNames() {
    this.monthlyService.getAllNamesByCategory(this.selectedCategory, this.selectedMonth)
      .subscribe (
        body => {
          this.namesCache = [];
          this.namesCache = body;
          //console.log("NC " + this.namesCache);
          //this.initializeColumns();
        },
        err => {
          console.log(err);
        }
      );
  }

  resetEachCategoryTotal() {
    this.totalAmountByType = 0;
    this.totalAmountOnceByType = 0;
    this.categories.map((category: Category) => {
      category.monthlyAmount = new Amount();
    });
  }

  //Total Spent for Monthly Data.
  calculateTotalAmount(month: string) {
    this.resetEachCategoryTotal();
    this.monthlyService.monthGetAllAmount(month)
      .subscribe (
        amountData => {
          amountData.map(body => {
            this.setEachCategoryTotal(body._id.category, body.balance);
            //console.log("Total Amount by Type:" + this.totalAmountByType);
          });

          this.totalAmountOutput.emit({totalAmount: this.totalAmountByType,
                                       totalAmountOnce: this.totalAmountOnceByType,
                                       type: this.type});
        },
        err => {
          console.log(err);
        }
      );

    //TODO : Have to get all the amounts in a single rest call instead of two.
    this.monthlyService.monthGetAllEssentialCost(month)
      .subscribe (
        amountData => {
          amountData.map(body => {
            this.setEachCategoryOther(body._id.category, body.balance);
            //console.log("Total Amount Essential by Type:" + this.totalAmountByType);
          });

          this.totalAmountOutput.emit({totalAmount: this.totalAmountByType,
            totalAmountOnce: this.totalAmountOnceByType,
            type: this.type});
        });
  }

  //Sets amount for each category and also calculates total amount.
  setEachCategoryTotal(categoryName: string, totalAmount: number) {
    this.categories.map((category: Category) => {
      if(category.name === categoryName) {
        category.monthlyAmount.total = Math.round(totalAmount);
        this.totalAmountByType += category.monthlyAmount.total;
        this.totalAmountByType = Math.round(this.totalAmountByType);
      }
    });
  }

  //Sets amount (once & essential) for each category and also calculates total once amount.
  setEachCategoryOther(categoryName: string, totalAmountE: number) {
    this.categories.map((category: Category) => {
      if(category.name === categoryName) {
        category.monthlyAmount.essential = Math.round(totalAmountE);
        category.monthlyAmount.once = category.monthlyAmount.total - category.monthlyAmount.essential;
        this.totalAmountOnceByType += category.monthlyAmount.once;
        this.totalAmountOnceByType = Math.round(this.totalAmountOnceByType);
      }
    });
  }

  //On Change of Category Tab
  onCategoryChange(event: any) {
    this.selectedCategory = this.categories[event.index].name;
    this.categoryView.getMonthlyDataByCategory(this.selectedCategory);
  }

  //On Month Changed
  onMonthChange(month: string) {
    this.selectedMonth = month;
    //console.log("Child Called" + this.selectedMonth + " Cagetory: " + this.selectedCategory);
    this.categoryView.getDataWithMonth(month);
    this.calculateTotalAmount(month);
  }

  onUpdatedData(data: MonthData) {
    this.calculateTotalAmount(this.selectedMonth);
  }
}
