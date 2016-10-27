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
    <p-tabPanel header="Grocery">
        <my-tree-table [files]="dataGrocery"></my-tree-table>
    </p-tabPanel>
    <p-tabPanel header="Food">
        <my-tree-table [files]="dataFood"></my-tree-table>
    </p-tabPanel>
    <p-tabPanel header="Entertainment">
        <my-tree-table [files]="dataEntertainment"></my-tree-table>    
    </p-tabPanel>
</p-tabView>`
})
export class MonthlyComponent implements OnInit {
  error: any;
  response: any;
  files: TreeNode[];
  dataGrocery: TreeNode[];
  dataFood: TreeNode[];
  dataEntertainment: TreeNode[];
  observable$: Observable<{}>;

  constructor(
    private http: Http,
    private router: Router,
    private hotelService: HotelService) {

  }

  ngOnInit(): void {
    this.getFileSystem().then(files => {
      this.files = files;
      this.dataGrocery = this.files.filter((row) => row.data.category === "Grocery");
      this.dataFood = this.files.filter((row) => row.data.category === "Food");
      this.dataEntertainment = this.files.filter((row) => row.data.category === "Entertainment");
    });
  }

  private getFileSystem() {
    return this.http.get('../assets/october.json')
      .toPromise()
      .then(res => <TreeNode[]> res.json().data)
      .then(data => { return data; });
  }
}
