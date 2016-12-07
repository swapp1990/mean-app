import {
  Component, OnInit, ComponentFactoryResolver, Input, Injector, Output, AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {EducationLoan} from "./education-loan.dyn.component";
import {MonthData} from "../../../models/month";
import {EventEmitter} from "events";
import {CarLoan} from "./car-loan.dyn.component";

export class DetailViewData {
  columnName: string;
  columnData: any;

  constructor(name: string, data: any) {
    this.columnName = name;
    this.columnData = data;
  }
}

//Should be exported seperate
//Should be in a database
export class SpecialDetailForName {
  dataName: string;
  columns: string[];
  specialComponent: any;

  constructor(name: string, columns: string[], specialComponent: any) {
    this.dataName = name;
    this.columns = columns;
    this.specialComponent = specialComponent;
  }
}

export class SpecialDataTemp {
  data: SpecialDetailForName[] = [];

  static getData (): SpecialDetailForName[] {
    let data: SpecialDetailForName[] = [];
      //Car Loan
      let carComponent = {
        component: CarLoan,
        inputs: {
          selectedMonth: ""
        }
      }
      let carLoan = new SpecialDetailForName("Car Loan", ["For Loan"], carComponent);
      data.push(carLoan);

      //Education Loan
      let educationComponent = {
        component: EducationLoan,
        inputs: {
          selectedMonth: ""
        }
      }
      let eduLoan = new SpecialDetailForName("India Education Loan", ["For Loan", "Indian Rupees"], educationComponent);
      data.push(eduLoan);
    return data;
  }
}


@Component({
  selector: 'details-view',
  template: `<!--<h4> Details </h4>-->
             <div *ngFor="let detail of detailData" (click)="onEditDetail($event)">
                <div *ngIf="!editFields">
                   {{detail.columnName}} - {{detail.columnData}}
                </div>
                <div *ngIf="editFields">
                  <input type="text" [(ngModel)]="detail.columnName">
                  <input type="text" [(ngModel)]="detail.columnData">
                </div>
             </div>
             <button pButton type="text" (click)="onCreateNewDetail($event)" icon="fa-plus"></button>
             <button *ngIf="editFields" pButton type="text" (click)="onUpdateDetail($event)" icon="fa-check"></button>
             <div></div>
             <dynamic-component [componentData]="specialComponent"></dynamic-component>
            `
})
export class DetailsView implements OnInit, AfterViewInit {
  monthData: MonthData = null;

  detailData: DetailViewData[] = [];

  @Output() updateDetails: EventEmitter = new EventEmitter();

  editFields: boolean = false;
  specialComponent: any = null;

  constructor(private injector: Injector, changeDetector: ChangeDetectorRef) {
    this.monthData = this.injector.get('monthData');
  }

  ngOnInit(): void {
    //console.log(this.monthData.details.length);
    this.renderDetailData();
    if(this.monthData.details && this.monthData.details.length > 0) {

    } else {
      this.monthData.details = [];
      //this.checkForUpdates();
    }
  }

  ngAfterViewInit(): void {

  }

  checkForUpdates() {
    let data: SpecialDetailForName[] = SpecialDataTemp.getData();
    var detailForDb = {};
    data.forEach((nameDetail: SpecialDetailForName) => {
      if(this.monthData.name === nameDetail.dataName) {
        nameDetail.columns.forEach(col => {
          detailForDb[col] = "";
        });
        this.monthData.details[0] = detailForDb;
        console.log(this.monthData);
        this.updateDetails.emit("Update", this.monthData);
      }
    });
  }

  renderDetailData() {
    this.detailData = [];
    this.monthData.details.forEach(detail => {
      let columns:string[] = Object.keys(detail);
      console.log(columns);
      columns.forEach(col => {
        this.detailData.push(new DetailViewData(col, detail[col]));
      });
    });

    //Add Special Components
    let data: SpecialDetailForName[] = SpecialDataTemp.getData();
    data.forEach((nameDetail: SpecialDetailForName) => {
      if(this.monthData.name === nameDetail.dataName) {
        this.specialComponent = nameDetail.specialComponent;
        this.specialComponent.inputs.selectedMonth = this.monthData.month;
      }
    });
    // if(this.monthData.name === "India Education Loan") {
    //   this.specialComponent = {
    //     component: EducationLoan,
    //     inputs: {selectedMonth: this.monthData.month}
    //   }
    // }
  }

  /**
   * Button Events
   */
  onCreateNewDetail(event) {
    var newCol = {};
    this.detailData.forEach((det: DetailViewData) => {
      newCol[det.columnName] = det.columnData;
    });
    newCol["Test"] = "Test2";
    //console.log(this.monthData.details);
    this.monthData.details[0] = newCol;
    console.log(this.monthData);
    this.updateDetails.emit("Update", this.monthData);
  }

  onUpdateDetail(event) {
    var newCol = {};
    this.detailData.forEach((det: DetailViewData) => {
      newCol[det.columnName] = det.columnData;
    });
    this.monthData.details[0] = newCol;
    //console.log(this.monthData);
    this.editFields = false;
    this.updateDetails.emit("Update", this.monthData);
  }

  onEditDetail(event) {
    //console.log("Edit");
    if(!this.editFields) {
      this.editFields = true;
    }
  }
}
