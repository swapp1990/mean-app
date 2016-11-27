import {Component, ViewChild, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'my-autocomplete',
  template: ` 
            <p-autoComplete placeholder="{{placeholder}}" [(ngModel)]="textInput"
                            [suggestions]="autoCompleteResults"
                            (completeMethod)="filteredResult($event)"></p-autoComplete>
            `
})

export class MyAutoComplete implements OnInit {
  public textInput: string;
  @Input() placeholder: string = "Enter...";
  autoCompleteResults: string[];
  @Input() allValues: string[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

  filteredResult(event) {
    this.autoCompleteResults = [];
    for(let i = 0; i < this.allValues.length; i++) {
      let name = this.allValues[i];
      if(name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.autoCompleteResults.push(name);
      }
    }
  }
}
