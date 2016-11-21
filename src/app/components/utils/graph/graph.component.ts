
import {Component, OnInit, Input} from "@angular/core";
import {GraphData} from "./graph-data.model";

@Component({
  selector: 's-graph',
  template: `<p-chart type="line" 
                       width="800"
                       height ="300"
                       [options]="options"
                       [data]="data" 
                       (onDataSelect)="selectData($event)">
              </p-chart>`
})

export class MyGraph implements OnInit {
  @Input() data: any;
  options: any;
  constructor() {}

  ngOnInit(): void {

    this.options = {
      title: {
        display: true,
        text: 'My Graph',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      responsive: false
    };
  }

  selectData(event) {

  }
}
