import { Component, OnInit } from '@angular/core';
import {MonthlyService} from "../../services/months.service";

@Component({
  selector: 'hotel',
  template: `
              <h1>Search-View</h1>
            `
})
export class SearchViewComponent implements OnInit {

  constructor(
    private monthlyService: MonthlyService) {

  }

  ngOnInit(): void {

  }
}
