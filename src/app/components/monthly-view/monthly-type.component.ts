import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Category} from "../../models/catagory";
import {MonthData} from "../../models/month";
import {EnumUtils} from "../../enums/EnumUtils";
import {MonthlyService} from "../../services/months.service";

@Component({
  selector: 'monthly-type-view',
  template: `
               <p-tabView orientation="left" (onChange)="onCategoryChange($event)">
                  <p-tabPanel *ngFor="let category of categories" header="{{getCategoryHeader(category)}}">
                  <my-data-table [files]="data" 
                        [dataColumns] = "dataColumns"
                        [totalCategoryAmount]="totalCategoryAmount"
                        (changeToggle)="onChangeToggle($event)" 
                        (updateRow)="onUpdateRow($event)"
                        (deleteEvent)="onDeleteRow($event)">
                  </my-data-table>
                  <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
                  <button pButton type="text" (click)="onSave($event)" icon="fa-check"></button>
                  </p-tabPanel>
               </p-tabView>
            `
})

export class MonthlyTypeComponent implements OnInit {
  @Input() type: string;
  categories: Category[];
  dataColumns: any[];
  namesCache: any[];
  selectedCategory: string;
  @Input() selectedMonth: string;
  @Input() data: MonthData[];
  @Input() totalCategoryAmount: number = 0;

  @Output() totalAmountOutput = new EventEmitter();
  totalAmount: number = 0;

  constructor(private monthlyService: MonthlyService) {}

  ngOnInit(): void {
    this.initializeCategories();
    this.getAllCategoryNames();
    this.getMonthlyDataByCategory();
  }

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

  initializeColumns() {
    this.dataColumns = [];
    this.dataColumns.push({name: 'Date', field: 'date', cache: null});
    this.dataColumns.push({name: 'Name', field: 'name', cache: this.namesCache});
    this.dataColumns.push({name: 'Cost', field: 'price', cache: null});
    this.dataColumns.push({name: 'Payment', field: 'payment', cache: null});
  }

  getCategoryHeader(categoryBody: Category) {
    return categoryBody.name + " - " + categoryBody.monthlyAmount;
  }

  getMonthlyDataByCategory() {
    this.monthlyService.getMonthlyDataByCategory(this.selectedCategory, this.selectedMonth)
      .subscribe (
        monthlyData => {
          this.data = monthlyData;
          console.log(this.data);
        },
        err => {
          console.log(err);
        }
      );
  }

  getAllCategoryNames() {
    this.monthlyService.getAllNamesByCategory(this.selectedCategory, this.selectedMonth)
      .subscribe (
        body => {
          this.namesCache = [];
          this.namesCache = body;
          //console.log("NC " + this.namesCache);
          this.initializeColumns();
        },
        err => {
          console.log(err);
        }
      );
  }

  //Total Spent for Monthly Data.
  calculateTotalAmount() {
    console.log(this.selectedMonth);
    //this.resetCategoryTotalSpent();
    this.totalAmount = 0;
    this.monthlyService.monthGetAllCost(this.selectedMonth)
      .subscribe (
        monthlyData => {
          monthlyData.map(body => {
            //console.log(body);
            if(body._id.category === this.selectedCategory) {
              this.totalCategoryAmount = body.balance;
              this.totalCategoryAmount = +Number(this.totalCategoryAmount).toFixed(2);
              //console.log("Total: " + this.totalCategory);
            }
            this.setEachCategoryTotal(body._id.category, body.balance);
            //console.log("Total:" + this.totalAmount);
          });

          this.totalAmountOutput.emit({totalAmount: this.totalAmount, type: this.type});
        },
        err => {
          console.log(err);
        }
      );
  }

  resetEachCategoryTotal() {
    this.categories.map((category: Category) => {
      category.monthlyAmount = 0;
    });
  }

  setEachCategoryTotal(categoryName: string, totalAmount: number) {
    this.categories.map((category: Category) => {
      if(category.name === categoryName) {
        category.monthlyAmount = totalAmount;
        category.monthlyAmount = +Number(category.monthlyAmount).toFixed(2);
        this.totalAmount += category.monthlyAmount;
        this.totalAmount = +Number(this.totalAmount).toFixed(2);
      }
    });
  }

  onChangeData() {
    this.totalCategoryAmount = 0;
    this.resetEachCategoryTotal();
    this.getMonthlyDataByCategory();
    this.calculateTotalAmount();
    this.getAllCategoryNames();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = this.categories[event.index].name;
    this.onChangeData();
  }

  onMonthChange(month: string) {
    this.selectedMonth = month;
    //console.log("Child Called" + this.selectedMonth + " Cagetory: " + this.selectedCategory);
    this.onChangeData();
  }

  onCreate($event) {
    let emptyData: MonthData = new MonthData(this.selectedCategory, this.selectedMonth, this.type);
    console.log(emptyData);
    this.monthlyService.createMonthData(emptyData)
      .subscribe(
        data => {
          //console.log("Create" + data);
          this.getMonthlyDataByCategory();
          //this.calculateTotalSpent();
        },
        err => {console.log(err);}
      );
  }

  onUpdateRow(event) {
    //console.log(event);
    this.monthlyService.updateMonthlyData(event._id, event)
      .subscribe(
        data => {
          //console.log("OK" + data);
          //this.calculateTotalSpent();
        },
        err => {console.log(err);}
      );
  }


  onDeleteRow(event: MonthData) {
    this.monthlyService.deleteMonthlyData(event._id)
      .subscribe (
        data => {
          //console.log("Delete " + data);
          //this.getAllMonthlyData();
        },
        err => {
          console.log(err);
        }
      );
  }
}
