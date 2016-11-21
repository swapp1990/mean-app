import { Component, OnInit } from '@angular/core';
import {MonthlyService} from "../../services/months.service";
import {MonthData} from "../../models/month";
import {GraphDataSet, GraphData} from "../utils/graph/graph-data.model";
import {EnumUtils} from "../../enums/EnumUtils";
import {Month} from "../../enums/months";

@Component({
  selector: 'search-view',
  template: `
              <h1>Search-View</h1>
              <div class="ui-widget-header ui-helper-clearfix" style="padding:4px 10px;border-bottom: 0 none">
                  <i class="fa fa-search" style="float:left;margin:4px 4px 0 0"></i>
                  <!--<input #gb [(ngModel)]="searchText" type="text" pInputText size="50" style="float:left" placeholder="Global Filter">-->
                  <p-autoComplete [(ngModel)]="searchText" [suggestions]="autoCompleteResults" (completeMethod)="filteredResult($event)"></p-autoComplete>
                  <button pButton type="text" (click)="searchTag($event)" icon="fa-search"></button>
              </div>
              
              <my-data-table [files]="data" 
                        [dataColumns] = "dataColumns"
                        [totalCategoryAmount]="totalCategoryAmount"
                        (changeToggle)="onChangeToggle($event)" 
                        (updateRow)="onUpdateRow($event)"
                        (deleteEvent)="onDeleteRow($event)">
              </my-data-table>
              <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
              <h1>Graph-View</h1>
              <s-graph [data]="graphData"></s-graph>
            `
})
export class SearchViewComponent implements OnInit {

  dataColumns: any[];
  data: MonthData[];
  searchText: string = "";

  autoCompleteResults: string[];
  allNames: string[] = [];

  graphData: GraphData;

  filteredResult(event) {
    this.autoCompleteResults = [];
    for(let i = 0; i < this.allNames.length; i++) {
      let name = this.allNames[i];
      if(name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.autoCompleteResults.push(name);
      }
    }
  }

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
        console.log(allNames);
;        this.allNames = allNames;
      });
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
      this.monthlyService.getAllDataBasedOnQuery(this.searchText)
        .subscribe (
          monthlyData => {
            this.data = monthlyData;
            this.updateGraph();
          },
          err => {
            console.log(err);
          }
        );
  }

  onCreate($event) {
    if(this.searchText !== "") {
      let emptyData: MonthData = new MonthData("Rent", "October", "Expense");
      emptyData.name = this.searchText;
      this.monthlyService.createMonthData(emptyData)
        .subscribe(
          data => {
            console.log("Create" + data);
            this.getDataBySearchTag();
          },
          err => {console.log(err);}
        );
    }
  }

  searchTag(event) {
    if(this.searchText !== "") {
      console.log(this.searchText);
      this.getDataBySearchTag();
    }
  }

  updateGraph() {
    let dataValues: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.data.forEach((monthData: MonthData) => {
      //console.log(monthData);
      let index: number = Month[monthData.month];
      dataValues[index] = monthData.price;
    });
    console.log("dataValues ", dataValues);
    this.graphData.addOrUpdateDataset(new GraphDataSet(this.searchText, dataValues));
  }

  onUpdateRow(event) {
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
