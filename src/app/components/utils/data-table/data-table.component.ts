import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode} from "primeng/primeng";

@Component({
  selector: 'my-data-table',
  template: `<p-dataTable [value]="files">
                <p-column field="date" header="Date"></p-column>
                <p-column field="name" header="Name"></p-column>
                <p-column field="price" header="Price"></p-column>
                <p-column field="payment" header="Payment Type"></p-column>
              </p-dataTable>`
})
export class DataTable implements OnInit {
  @Input() files: any[];

  constructor(
    private http: Http) {

  }

  ngOnInit(): void {
  }
}
