import {Component, OnInit, ViewChild} from '@angular/core';
import {MonthlyService} from "../../services/months.service";
import {MonthData} from "../../models/month";
import {GraphDataSet, GraphData} from "../utils/graph/graph-data.model";
import {EnumUtils} from "../../enums/EnumUtils";
import {Month} from "../../enums/months";
import {MyAutoComplete} from "../utils/auto-complete/autocomplete.component";

@Component({
  selector: 'search-view',
  template: `
              <h1>Search-View</h1>
              <div class="ui-widget-header ui-helper-clearfix" style="padding:4px 10px;border-bottom: 0 none">
                  <i class="fa fa-search" style="float:left;margin:4px 4px 0 0"></i>
                  <!--<input #gb [(ngModel)]="searchText" type="text" pInputText size="50" style="float:left" placeholder="Global Filter">-->
                  <my-autocomplete #name [allValues] = "allNames"></my-autocomplete>                  
                  <button pButton type="text" (click)="searchTag($event)" icon="fa-search"></button>
              </div>
              <div class="ui-widget-header ui-helper-clearfix" style="padding:4px 10px;border-bottom: 0 none">
                  <i class="fa fa-search" style="float:left;margin:4px 4px 0 0"></i>
                  <my-autocomplete #detailsKey [allValues] = "allKeys" [placeholder]="'Key'"></my-autocomplete>
                  <my-autocomplete #detailsValue [placeholder]="'Value'"></my-autocomplete>
                  <button pButton type="text" (click)="searchTag2($event)" icon="fa-search"></button>
              </div>
              <my-data-table [files]="data" 
                        [dataColumns] = "dataColumns"
                        [isExpander] = "'true'"
                        [expanderDetails] = "formattedDetails"
                        [totalCategoryAmount]="totalAmount"
                        (changeToggle)="onChangeToggle($event)" 
                        (updateRow)="onUpdateRow($event)"
                        (selectRow)="onSelectRow($event)"
                        (deleteEvent)="onDeleteRow($event)">
              </my-data-table>
              <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
              <button pButton type="text" (click)="onCreateCopy($event)" icon="fa-copy"></button>
              <h1>Graph-View</h1>
              <s-graph [data]="graphData"></s-graph>
            `
})
export class SearchViewComponent implements OnInit {
  dataColumns: any[];
  data: MonthData[];
  formattedDetails: any[];
  selectedRow: MonthData;
  totalAmount: number = 0;
  graphData: GraphData;

  //Search by Name
  allNames: string[] = [];
  @ViewChild('name')
    autoComplete1: MyAutoComplete;
  //Search by Details
  allKeys: string[] = [];
  @ViewChild('detailsKey')
    autoComplete2: MyAutoComplete;
  @ViewChild('detailsValue')
    autoComplete3: MyAutoComplete;

  constructor(
    private monthlyService: MonthlyService) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    //this.initializeData();
    this.initializeAllNames();
    this.graphData = new GraphData();
  }

  initializeAllNames() {
    this.monthlyService.getAllNames().subscribe(
      allNames => {
        //console.log(allNames);
        this.allNames = allNames;
      });

    this.monthlyService.getAllDetails().subscribe(
      (details: any) => {
        details.forEach(item => {
          let columns: string[] = Object.keys(item);
          columns.forEach(col => {
            this.allKeys.push(col);
          });
        });
      });

    this.allKeys = Array.from(new Set(this.allKeys));
    console.log(this.allKeys);
  }

  initializeColumns() {
    this.dataColumns = [];
    this.dataColumns.push({name: 'Month', field: 'month', filteredResults: null});
    this.dataColumns.push({name: 'Category', field: 'category', filteredResults: null});
    this.dataColumns.push({name: 'Date', field: 'date', filteredResults: null});
    this.dataColumns.push({name: 'Name', field: 'name', filteredResults: null});
    this.dataColumns.push({name: 'Cost', field: 'price', filteredResults: null});
    this.dataColumns.push({name: 'Payment', field: 'payment', filteredResults: null});
    this.dataColumns.push({name: 'Income/Expense', field: 'isIncome', filteredResults: null});
  }

  getDataBySearchTag() {
      this.monthlyService.getAllDataBasedOnQuery(this.autoComplete1.textInput)
        .subscribe (
          monthlyData => {
            this.data = monthlyData;
            this.calculateTotalDollars();
            this.updateGraph();
            this.formatDetailsForExpander();
          },
          err => {
            console.log(err);
          }
        );
  }

  getDataByDetailTag() {
    this.monthlyService.getDataBasedOnDetails(this.autoComplete2.textInput, this.autoComplete3.textInput)
      .subscribe (
        monthlyData => {
          this.data = monthlyData;
          this.calculateTotalDollars();
          this.updateGraph();
          this.formatDetailsForExpander();
        },
        err => {
          console.log(err);
        }
      );
  }

  onCreate($event) {
    if(this.autoComplete1.textInput !== "") {
      let emptyData: MonthData = new MonthData("Rent", "October", "Expense");
      emptyData.name = this.autoComplete1.textInput;
      this.createData(emptyData);
    }
  }

  onCreateCopy(event) {
    if(this.selectedRow) {
      this.createData(this.selectedRow);
    }
  }

  createData(data: MonthData) {
    this.monthlyService.createMonthData(data)
      .subscribe(
        data => {
          console.log("Create" + data);
          this.getDataBySearchTag();
        },
        err => {console.log(err);}
      );
  }

  searchTag(event) {
    if(this.autoComplete1.textInput !== "") {
      console.log(this.autoComplete1.textInput);
      this.getDataBySearchTag();
    } else if(this.autoComplete2.textInput !== "" && this.autoComplete3.textInput !== "") {
      this.getDataByDetailTag();
    }
  }

  searchTag2(event) {
    if(this.autoComplete2.textInput !== "" && this.autoComplete3.textInput !== "") {
      this.getDataByDetailTag();
    }
  }

  calculateTotalDollars() {
    let amount = 0;
    this.data.forEach((monthData: MonthData) => {
      amount += monthData.price;
    });
    this.totalAmount = Math.round(amount);
  }

  updateGraph() {
    let dataValues: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.data.forEach((monthData: MonthData) => {
      //console.log(monthData);
      let index: number = Month[monthData.month];
      let value = dataValues[index];
      let priceRounded = Math.round(monthData.price);
      value += priceRounded;
      dataValues[index] = value;
    });
    //console.log("dataValues ", dataValues);
    this.graphData.addOrUpdateDataset(new GraphDataSet(this.autoComplete1.textInput, dataValues));
  }

  formatDetailsForExpander() {
    this.formattedDetails = [];
    this.data.forEach((monthData: MonthData) => {
      if(monthData.details) {
        let objToPush:any = {name: "", value: null};
        monthData.details.forEach(detail => {
          let detailS: any = [];
          let columns:string[] = Object.keys(detail);
          columns.forEach(colDetail => {
            let objToPush:any = {name: "", value: null};
            objToPush.name = colDetail;
            objToPush.value = detail[colDetail];
            detailS.push(objToPush);
          });
          this.formattedDetails[monthData._id] = detailS;
        });
      }
    });

    //console.log("Formatted Details: ", this.formattedDetails);
  }

  onUpdateRow(event) {
    if(event) {
      this.monthlyService.updateMonthlyData(event._id, event)
        .subscribe(
          data => {
            console.log("OK Update", data);
            this.updateGraph();
          },
          err => {console.log(err);}
        );
    }
  }

  onSelectRow(data: MonthData) {
    this.selectedRow = data;
  }
}
