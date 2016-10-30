import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode} from "primeng/primeng";
import {MonthData} from "../../../models/month";

@Component({
  selector: 'my-data-table',
  template: `<p-dataTable *ngIf='!checked' [value]="files" [editable]="true" 
                        selectionMode="single" 
                        (onRowSelect)="onRowSelect($event)" 
                        (onRowUnselect)="onRowUnselect($event)" 
                        [rows]="5" [paginator]="true" 
                        [(selection)]="selectedRow">
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
                <p-footerColumnGroup>
                   <p-row>
                      <p-column footer="Total:" colspan="2"></p-column>
                      <p-column footer="{{totalCategory}}"></p-column>
                   </p-row>
                </p-footerColumnGroup>
              </p-dataTable>
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
  @Output() deleteEvent = new EventEmitter();
  checked: boolean = false;
  selectedRow: any;
  @Input() totalCategory: number;
  text: string;
  brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
  test: any[];

  constructor(
    private http: Http) {
      this.test = [];
      this.test.push("January");
      this.test.push("Feb");
      this.test.push("March");
  }

  onRowSelect(event) {
    event.data.selected = true;
    //console.log(event);
  }

  onRowUnselect(event) {
    event.data.selected = false;
    this.updateRow.emit(event.data);
    //console.log(event);
  }

  isVisible(col: any) {
    return col.cache != null;
  }

  search(event: any, col: any) {
    //console.log(col);
    col.filteredResults = [];
    if(col.cache.length > 0) {
      for(let i = 0; i < col.cache.length; i++) {
        let name = col.cache[i];
        if(name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
          col.filteredResults.push(name);
          //console.log(name);
        }
      }
    }
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

  ngOnInit(): void {
  }
}
