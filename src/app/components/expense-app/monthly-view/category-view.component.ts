import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {MonthlyService} from "../../../services/months.service";
import {Month} from "../../../enums/months";
import {EnumUtils} from "../../../enums/EnumUtils";
import {MonthData} from "../../../models/month";
import {DataTable} from "../../utils/data-table/data-table.component";
import {isNullOrUndefined} from "util";
import {MyProgressBar} from "../../utils/progress-bar/progress-bar.component";

@Component({
  selector: 'category-view',
  template: `<h3>Monthly Data</h3>
             <div class="label label-primary">Essential Amount - {{essentialAmt}}</div>
             <div class="label label-primary">Once Amount - {{onceAmt}}</div>
             <my-data-table #table1 [files]="categoryData"
                            [dataColumns] = "dataColumns"
                            [isExpander] = "'true'"
                            [expanderDetails] = "formattedDetails"
                            (selectRow)= "onSelectRow($event)"
                            (updateRow)="onUpdateRow($event)"
                            (createDetailClicked)="onCreateDetail($event)"></my-data-table> 
             <button pButton type="text" (click)="onCreateNew($event)" icon="fa-plus"></button>
             <button pButton type="text" (click)="onCreateCopy($event)" icon="fa-copy"></button>
             <button pButton type="text" (click)="onEdit($event)" icon="fa-edit"></button>
             <button pButton type="text" (click)="onDelete($event)" icon="fa-minus-circle"></button>
              `
})

export class CategoryView implements OnInit {

  @Input() selectedCategory: string;
  @Input() selectedMonth: string;
  @Input() type: string;

  @Output() updatedData: any = new EventEmitter();
  categoryData: MonthData[] = [];
  dataColumns: any[];
  selectedRow: MonthData = null;
  formattedDetails: any[];

  essentialAmt: number = 0;
  onceAmt: number = 0;

  @ViewChild('table1')
   myTable: DataTable;
  constructor(
    private monthlyService: MonthlyService) {

  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getMonthlyDataByCategory(this.selectedCategory);
  }

  /**
   * Functions For Inputs
   */
  getDataWithMonth(month: string) {
    this.monthlyService.getMonthlyDataByCategory(month, this.selectedCategory)
      .subscribe (
        (monthlyData: MonthData[]) => {
          this.categoryData = monthlyData;
          console.log("Get Data", this.categoryData);
          this.calculateAmounts();
          this.formatDetailsForExpander();
        },
        err => {
          console.log(err);
        }
      );
  }

  getMonthlyDataByCategory(changedCategory: string) {
    this.monthlyService.getMonthlyDataByCategory(this.selectedMonth, changedCategory)
      .subscribe (
        (monthlyData: MonthData[]) => {
          this.categoryData = monthlyData;
          console.log("Get Data", this.categoryData);
          this.calculateAmounts();
          this.formatDetailsForExpander();
        },
        err => {
          console.log(err);
        }
      );
  }

  initializeColumns() {
    this.dataColumns = [];
    this.dataColumns.push({name: 'Date', field: 'date', filteredResults: null});
    this.dataColumns.push({name: 'Name', field: 'name', filteredResults: null});
    this.dataColumns.push({name: 'Cost', field: 'price', filteredResults: null});
    this.dataColumns.push({name: 'Payment', field: 'payment', filteredResults: null});
    this.dataColumns.push({name: 'isEssential', field: 'isEssential', filteredResults: ['true', 'false']});
  }

  createMonthData(data: MonthData) {
    this.monthlyService.createMonthData(data)
      .subscribe(
        data => {
          console.log("Create ", data);
          this.getMonthlyDataByCategory(this.selectedCategory);
        },
        err => {console.log(err);}
      );
  }

  updateMonthData(data: MonthData) {
    this.monthlyService.updateMonthlyData(data._id, data)
      .subscribe(
        data => {
          //console.log("Updated ", data);
          this.updatedData.emit(data);
        },
        err => {console.log(err);}
      );
  }

  deleteMonthData(data: MonthData) {
    this.monthlyService.deleteMonthlyData(this.selectedRow._id)
      .subscribe (
        data => {
          //console.log("Delete " + data);
          this.getMonthlyDataByCategory(this.selectedCategory);
        },
        err => {
          console.log(err);
        }
      );
  }

  calculateAmounts() {
    this.essentialAmt = 0;
    this.onceAmt = 0;
    this.categoryData.forEach((monthData: MonthData) => {
      if(isNullOrUndefined(monthData.isEssential) || !monthData.isEssential) {
        this.onceAmt += monthData.price;
        this.onceAmt =  Math.round(this.onceAmt);
      } else {
        this.essentialAmt += monthData.price;
        this.essentialAmt =  Math.round(this.essentialAmt);
      }
    });
  }

  addSingleEmptyDetailColumn(columnName: string) {
    console.log("detail ", columnName);
    if(!this.selectedRow.details) {
      this.selectedRow.details = [];
    }
    var obj = this.addAllDetails(this.selectedRow.details);
    obj[columnName] = "";
    this.selectedRow.details = [];
    this.selectedRow.details.push(obj);
    this.updateMonthData(this.selectedRow);
  }

  addAllDetails(detailsGot: any): any {
      var obj = {};
      detailsGot.forEach(detail => {
        obj = detail;
      });
      return obj;
  }


  formatDetailsForExpander() {
    this.formattedDetails = [];
    this.categoryData.forEach((monthData: MonthData) => {
      if(monthData.details) {

        let objToPush:any = {name: "", value: null};
        monthData.details.forEach(detail => {
          let detailS: any = [];
          let detailPlusCustom: any = {};
          let columns:string[] = Object.keys(detail);
          columns.forEach(colDetail => {
            let objToPush:any = {name: "", value: null};
            objToPush.name = colDetail;
            objToPush.value = detail[colDetail];
            detailS.push(objToPush);
          });
          let customComponent = null
          if(monthData.name === "India Education Loan") {
            customComponent = {
              component: MyProgressBar,
              inputs: {
                showNum: 78
              }
            }
          }
          detailPlusCustom = {details: detailS, custom: customComponent};
          console.log(detailPlusCustom);
          this.formattedDetails[monthData._id] = detailPlusCustom;
        });
      }
    });

    //Add custom component details

    //console.log("Formatted Details: ", this.formattedDetails);
  }

  /**
   * Data Table Events
   */
  onSelectRow(data: MonthData) {
    this.selectedRow = data;
  }

  onUpdateRow(data: MonthData) {
    //console.log("To Update ", this.selectedRow);
    if(this.selectedRow != null) {
      this.updateMonthData(this.selectedRow);
      this.selectedRow = null;
    }
  }

  onCreateDetail(event: any) {
    //First add all the details already present.
    //this.addAllDetails(this.selectedRow.details);

    this.addSingleEmptyDetailColumn(event);
  }

  /**
   * Button Events
   */
  onCreateNew($event) {
    let emptyData: MonthData = new MonthData(this.selectedCategory, this.selectedMonth, this.type, "false");
    //console.log(emptyData);
    this.createMonthData(emptyData);
  }

  onCreateCopy(event) {
    if(this.selectedRow) {
      this.createMonthData(this.selectedRow);
    }
  }

  onEdit(event) {
    if(this.selectedRow) {
      this.myTable.onEditOutside();
    }
  }

  onDelete(event) {
    if(this.selectedRow) {
      this.deleteMonthData(this.selectedRow);
    }
  }
}
