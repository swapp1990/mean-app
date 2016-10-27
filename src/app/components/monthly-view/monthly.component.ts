import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {HotelService} from "../../services/hotels.service";
import {Hotel} from "../../models/hotel";
import {TreeNode} from "primeng/primeng";

@Component({
  selector: 'monthly-view',
  template: `<p-tabView orientation="left">
    <p-tabPanel header="Header 1">
        <p-treeTable [value]="files">
          <p-column field="date" header="Date"></p-column>
          <p-column field="name" header="Name"></p-column>
          <p-column field="price" header="Price"></p-column>
          <p-column field="payment" header="Payment Type"></p-column>
        </p-treeTable>
    </p-tabPanel>
    <p-tabPanel header="Header 2">
        Content 2
    </p-tabPanel>
    <p-tabPanel header="Header 3">
        Content 3    
    </p-tabPanel>
</p-tabView>`
})
export class MonthlyComponent implements OnInit {
  error: any;
  response: any;
  files: TreeNode[];
  observable$: Observable<{}>;

  constructor(
    private http: Http,
    private router: Router,
    private hotelService: HotelService) {

  }

  ngOnInit(): void {
    this.getFileSystem().then(files => this.files = files);
  }

  private getFileSystem() {
    return this.http.get('../assets/october.json')
      .toPromise()
      .then(res => <TreeNode[]> res.json().data)
      .then(data => { return data; });
  }
}
