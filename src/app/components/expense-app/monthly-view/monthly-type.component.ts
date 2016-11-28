import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {isNullOrUndefined} from "util";
import {Category} from "../../../models/catagory";
import {MonthData} from "../../../models/month";
import {MonthlyService} from "../../../services/months.service";
import {EnumUtils} from "../../../enums/EnumUtils";
import {CategoryView} from "./category-view.component";

@Component({
  selector: 'monthly-type-view',
  template: `
               <p-tabView orientation="left" (onChange)="onCategoryChange($event)">
                  <p-tabPanel *ngFor="let category of categories" header="{{getCategoryHeader(category)}}">
                  <!--<my-data-table [files]="dataOnce" -->
                        <!--[dataColumns] = "dataColumns"-->
                        <!--[totalCategoryAmount]="totalCategoryAmountOnce"-->
                        <!--(changeToggle)="onChangeToggle($event)" -->
                        <!--(updateRow)="onUpdateRow($event)"-->
                        <!--(selectRow)="onSelectRow($event)"-->
                        <!--(deleteEvent)="onDeleteRow($event)"-->
                        <!--(copyRow)="onCopyRow($event)">-->
                  <!--</my-data-table>-->
                  <!--<h3>Details Data</h3>-->
                  <!--<my-data-table [files]="detailsData" -->
                        <!--[dataColumns] = "detailsColumns"-->
                        <!--(updateRow)= "onUpdateRow($event)">-->
                  <!--</my-data-table>-->
                  <!--<input [(ngModel)]="colNameToAdd" type="text">-->
                  <!--<button pButton type="text" (click)="onEditDetails($event)" icon="fa-plus"></button>-->
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

  selectedCategory: string;
  @Input() selectedMonth: string;

  @ViewChild('cv')
    categoryView: CategoryView;

  namesCache: any[];
  selectedRow: MonthData;

  @Input() dataOnce: MonthData[];
  @Input() dataEssential: MonthData[];
  @Input() detailsData: any;
  detailsColumns: any[];
  colNameToAdd: string = "";
  @Input() totalCategoryAmount: number = 0;
  totalCategoryAmountOnce: number = 0;
  totalCategoryAmountEssential: number = 0;


  constructor(private monthlyService: MonthlyService) {}

  //TODO: Have to refactor to have primeng view and database view seperated.

  ngOnInit(): void {
    this.initializeCategories();

    //this.getAllCategoryNames();
    //this.getMonthlyDataByCategory();
  }

  //Show Categories
  initializeCategories() {
    this.categories = [];
    if(this.type === "Expense") {
      EnumUtils.getExpenseCategoriesString().map(expense => {
        this.categories.push({name: expense, monthlyAmount: 0});
      });
    } else {
      EnumUtils.getIncomeCategoriesString().map(income => {
        this.categories.push({name: income, monthlyAmount: 0});
      });
    }
    this.selectedCategory = this.categories[0].name;
    this.calculateTotalAmount();
  }

  getCategoryHeader(categoryBody: Category) {
    return categoryBody.name + " - " + categoryBody.monthlyAmount;
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
    this.categories.map((category: Category) => {
      category.monthlyAmount = 0;
    });
  }

  //Total Spent for Monthly Data.
  calculateTotalAmount() {
    this.resetEachCategoryTotal();
    this.monthlyService.monthGetAllAmount(this.selectedMonth)
      .subscribe (
        amountData => {
          amountData.map(body => {
            this.setEachCategoryTotal(body._id.category, body.balance);
            //console.log("Total Amount by Type:" + this.totalAmountByType);
          });

          this.totalAmountOutput.emit({totalAmount: this.totalAmountByType, type: this.type});
        },
        err => {
          console.log(err);
        }
      );
  }

  //Sets amount for each category and also calculates total amount.
  setEachCategoryTotal(categoryName: string, totalAmount: number) {
    this.categories.map((category: Category) => {
      if(category.name === categoryName) {
        category.monthlyAmount = totalAmount;
        category.monthlyAmount = Math.round(category.monthlyAmount);
        this.totalAmountByType += category.monthlyAmount;
        this.totalAmountByType = Math.round(this.totalAmountByType);
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
  }

  onUpdatedData(data: MonthData) {
    this.calculateTotalAmount();
  }

  onEditDetails(event) {
    if(this.selectedRow) {
      //First add all the details already present.
      this.addAllDetails(this.selectedRow.details);
      //then add the column
      this.addSingleEmptyDetailColumn();
    }
  }

  addSingleEmptyDetailColumn() {
    this.detailsColumns = [];
    this.detailsData = [];

    var obj = {};
    if(!this.selectedRow.details) {
      this.selectedRow.details = [];
    }
    this.selectedRow.details.forEach(detail => {
      let columns: string[] = Object.keys(detail);
      columns.forEach(col => {
        this.detailsColumns.push({name: col, field: col, filteredResults: null});
        obj[col] = "";
      });
    });

    obj[this.colNameToAdd] = "";
    this.detailsColumns.push({name: this.colNameToAdd, field: this.colNameToAdd, filteredResults: null});
    this.detailsData.push(obj);

    console.log(this.detailsData);
    this.selectedRow.details = this.detailsData;
    this.monthlyService.updateMonthlyData(this.selectedRow._id, this.selectedRow)
      .subscribe(
        data => {
          console.log("Updated ", data);
          this.calculateTotalAmount();
        },
        err => {console.log(err);}
      );
  }

  addAllDetails(detailsGot: any) {
    if(detailsGot) {
      detailsGot.forEach(detail => {
        let columns: string[] = Object.keys(detail);
        columns.forEach(col => {
          this.detailsColumns.push({name: col, field: col, filteredResults: null});
        });
      });
      this.detailsData = detailsGot;
    }
  }
}
