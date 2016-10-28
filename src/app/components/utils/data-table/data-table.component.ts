import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode} from "primeng/primeng";
import {MonthData} from "../../../models/month";

@Component({
  selector: 'my-data-table',
  template: `<p-dataTable *ngIf='!checked' [value]="files">
                <p-column field="date" header="Date"></p-column>
                <p-column field="name" header="Name"></p-column>
                <p-column field="price" header="Price"></p-column>
                <p-column field="payment" header="Payment Type"></p-column>
              </p-dataTable>
              <p-dataTable *ngIf='checked' [value]="files" [editable]="true">
                <p-column styleClass="col-button">
                  <template pTemplate type="header">
                      <button type="button" pButton icon="fa-refresh"></button>
                  </template>
                  <template let-row="rowData" pTemplate type="body">
                      <button type="button" pButton (click)="deleteRow(row)" icon="fa-minus"></button>
                  </template>
                </p-column>
                <p-column field="date" header="Date" [editable]="true"></p-column>
                <p-column field="name" header="Name" [editable]="true"></p-column>
                <p-column field="price" header="Price" [editable]="true"></p-column>
                <p-column field="payment" header="Payment Type" [editable]="true"></p-column>
              </p-dataTable>
              <p-toggleButton (onChange)="handleChange($event)" [(ngModel)]="val"></p-toggleButton>`
})
export class DataTable implements OnInit {
  @Input() files: any[];
  @Output() changeToggle = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  checked: boolean = false;

  constructor(
    private http: Http) {

  }

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
