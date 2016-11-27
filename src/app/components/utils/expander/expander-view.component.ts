import {Component, ViewChild, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'my-expander',
  template: ` <div class="ui-grid ui-grid-responsive ui-fluid" style="font-size:16px;padding:20px">
                <div class="ui-grid-row">
                  <div class="ui-grid-col-9">
                    <button pButton type="text" (click)="onEdit($event)" icon="fa-edit"></button>
                    <div class="ui-grid ui-grid-responsive ui-grid-pad">
                        <div *ngFor="let col of inputCols">
                            <div class="ui-grid-row">
                              <div class="ui-grid-col-2 label">{{col.name}}: </div>
                              <div *ngIf="!editDetails" class="ui-grid-col-10">{{col.value}}</div>
                              <input *ngIf="editDetails" type="text" [(ngModel)]="col.value">
                            </div>
                        </div>
                    </div>
                  </div>      
                </div>
              </div>
            `
})

export class MyExpander implements OnInit {

  @Input() inputCols: any;
  @Input() rowSelected: boolean = false;
  editDetails: boolean = false;

  @Output() editDone = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {

  }

  onEdit(event) {
    if(this.editDetails) {
      this.editDone.emit(this.inputCols);
    }
    this.editDetails = !this.editDetails;
  }

}
