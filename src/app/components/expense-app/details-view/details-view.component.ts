import {Component, OnInit, ComponentFactoryResolver, Input, Injector, Output} from '@angular/core';
import { Router } from '@angular/router';
import {EducationLoan} from "./education-loan.dyn.component";
import {MonthData} from "../../../models/month";
import {EventEmitter} from "events";

export class DetailViewData {
  columnName: string;
  columnData: any;

  constructor(name: string, data: any) {
    this.columnName = name;
    this.columnData = data;
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
             <!--<dynamic-component [componentData]="componentData"></dynamic-component>-->
            `
})
export class DetailsView implements OnInit {
  monthData: MonthData = null;

  detailData: DetailViewData[] = [];

  @Output() updateDetails: EventEmitter = new EventEmitter();

  editFields: boolean = false;

  constructor(private injector: Injector) {
    this.monthData = this.injector.get('monthData');
  }

  ngOnInit(): void {
    if(this.monthData.details.length > 0) {
      this.renderDetailData();
    } else {
      this.monthData.details = [];
      var newCol = {};
      this.monthData.details.push(newCol);
      this.updateDetails.emit("Test", this.monthData);
    }

    // this.componentData = {
    //   component: EducationLoan,
    //   inputs: {}
    // };
  }

  renderDetailData() {
    this.detailData = [];
    this.monthData.details.forEach(detail => {
      let columns:string[] = Object.keys(detail);
      //console.log(columns);
      columns.forEach(col => {
        this.detailData.push(new DetailViewData(col, detail[col]));
      });
    });
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
