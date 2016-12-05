import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode, MenuItem, OverlayPanel} from "primeng/primeng";
import {MonthData} from "../../../models/month";

@Component({
  selector: 'my-data-table',
  template: `<p-dataTable *ngIf='!checked' [value]="files" [editable]="true" 
                        selectionMode="single" 
                        expandableRows="true"
                        (onRowSelect)="onRowSelect($event)" 
                        (onRowUnselect)="onRowUnselect($event)" 
                        [rows]="rows" 
                        [paginator]="true" 
                        [(selection)]="selectedRow">
                <!--<p-column [style]="{'width':'10%','text-align':'center'}" header="Logo">-->
                  <!--<template let-car="rowData" pTemplate type="body">-->
                    <!--<button type="button" pButton (click)="selectCar($event,car,op1);" icon="fa-search"></button>-->
                    <!--<my-overlay #op1></my-overlay>-->
                  <!--</template>-->
                <!--</p-column>-->
                <p-column *ngIf='isExpander' expander="true" styleClass="col-icon">
                  <template let-row>
                    <my-expander [renderedComponent]="row.detailsView"
                                 (editDone)="onEditDetails(event)"></my-expander>
                  </template>
                </p-column> 
                <p-column *ngFor="let col of dataColumns" field="{{col.field}}" header="{{col.name}}" [style]="{'overflow':'visible'}">
                  <template let-row="rowData" pTemplate type="body">
                    <span *ngIf='row.selected'>
                      <p-autoComplete [suggestions]="col.filteredResults" 
                                      (completeMethod)="search($event, col)" 
                                      [minLength]="2"
                                      [(ngModel)]="row[col.field]"></p-autoComplete>
                    </span>
                    <span *ngIf='!row.selected'>{{row[col.field]}}</span>
                  </template>
                </p-column>
                <!--<p-footerColumnGroup>-->
                   <!--<p-row>-->
                      <!--<p-column footer="Total:" colspan="2"></p-column>-->
                      <!--<p-column footer="{{totalCategoryAmount}}"></p-column>-->
                   <!--</p-row>-->
                <!--</p-footerColumnGroup>-->
              </p-dataTable>
              <!--<p-contextMenu #cm [model]="contextItems"></p-contextMenu>-->
              
              `

//               <p-dataTable *ngIf='checked' [value]="files" [editable]="true">
//                 <p-column styleClass="col-button" [style]="{'max-height':'10px','overflow':'scroll'}">
//                   <template pTemplate type="header">
//                       <button type="button" pButton icon="fa-refresh"></button>
//                   </template>
//                   <template let-row="rowData" pTemplate type="body">
//                       <button type="button" pButton (click)="deleteRow(row)" icon="fa-minus"></button>
//                   </template>
//                 </p-column>
//                 <p-column field="date" header="Date" [editable]="true"></p-column>
//                 <p-column field="name" header="Name" [editable]="true"></p-column>
//                 <p-column field="price" header="Price" [editable]="true"></p-column>
//                 <p-column field="payment" header="Payment Type" [editable]="true"></p-column>
//               </p-dataTable>
//
//               <p-toggleButton (onChange)="handleChange($event)" [(ngModel)]="val"></p-toggleButton>`
})
export class DataTable implements OnInit {
  @Input() files: any[];
  @Input() dataColumns: any[];

  @Output() changeToggle = new EventEmitter();
  @Output() updateRow = new EventEmitter();
  @Output() selectRow = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() copyRow = new EventEmitter();
  checked: boolean = false;
  isRowSelected: boolean = false;
  selectedRow: any;
  @Input() totalCategoryAmount: number;

  //Customizable Options
  @Input() rows: number = 5;

  //Move outside of this class
  @Output() createDetailClicked = new EventEmitter();

  //Expander Details
  @Input() isExpander: boolean = false;
  @Input() expanderDetails: any = {};
  @Input() customComponent: any = null;

  contextItems: MenuItem[];

  constructor(
    private http: Http) {

  }

  ngOnInit(): void {
    this.contextItems = [
      {label: 'Edit', icon: 'fa-search', command: (event) => this.onEdit(event)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete()},
      {label: 'Copy', icon: 'fa-copy', command: (event) => this.onCopy(this.copyRow)},
    ];
  }

  onRowSelect(event) {
    if(!event.data) {
      console.log("Error: No data defined!");
    }
    this.selectRow.emit(event.data);
    this.isRowSelected = true;
  }

  onRowUnselect(event) {
    event.data.selected = false;
    this.updateRow.emit(event.data);
    this.isRowSelected = false;
  }

  onCreateDetails(event: any) {
    if(this.isRowSelected) {
      this.createDetailClicked.emit(event);
    }
  }

  onEditDetails(event: any) {
    //console.log("Edit Details", this.selectedRow);
    this.updateRow.emit(this.selectedRow);
  }

  onEdit(event) {
    this.selectedRow.selected = true;
    //console.log("Row to Edit ", this.selectedRow);
  }

  onEditOutside() {
    this.selectedRow.selected = true;
  }

  onDelete() {

  }

  onCopy(copyRow) {
    //console.log("Copy ", copyRow);
    copyRow.emit();
  }

  isVisible(col: any) {
    return col.cache != null;
  }

  search(event: any, col: any) {
    //console.log(col);
    col.filteredResults = [];
    if(col.cache && col.cache.length > 0) {
      for(let i = 0; i < col.cache.length; i++) {
        let name = col.cache[i];
        if(name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
          col.filteredResults.push(name);
          //console.log(name);
        }
      }
    }
  }

  selectCar(event, row: any, overlaypanel: OverlayPanel) {
    //console.log(car);
    overlaypanel.toggle(row, event);
  }

  // handleDropdownClick() {
  //   this.filteredBrands = [];
  //
  //   //mimic remote call
  //   setTimeout(() => {
  //     for(let i = 0; i < this.namesCache.length; i++) {
  //       let name = this.namesCache[i].name;
  //       //if(name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
  //         this.filteredBrands.push(name);
  //         //console.log(name);
  //       //}
  //     }
  //   }, 100)
  // }

  handleChange(e) {
    var isChecked = e.checked;
    this.checked = !this.checked;
    if(!this.checked) {
      this.changeToggle.emit(this.checked);
    }
  }

  deleteRow(row: any) {
    //console.log(row);
    this.deleteEvent.emit(row);
  }
}
