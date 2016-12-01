import {
  Component, ViewChild, EventEmitter, Input, OnInit, Output, Injector, ElementRef,
  ComponentFactoryResolver, ViewContainerRef
} from "@angular/core";
import {MyProgressBar} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'my-expander',
  entryComponents: [MyProgressBar],
  template: ` <div class="ui-grid ui-grid-responsive ui-fluid" style="font-size:16px;padding:20px">
                <div class="ui-grid-row">
                  <div class="ui-grid-col-9">
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
              <div *ngIf="rowSelected">
                <button  pButton type="text" (click)="onEdit($event)" icon="fa-edit"></button>
                <input [(ngModel)]="colNameToAdd" type="text">
                <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
              </div>
              <dynamic-component [componentData]="componentData"></dynamic-component>

            `
})

export class MyExpander implements OnInit {

  @Input() inputCols: any;
  @Input() extraComponent: any = null;
  @Input() rowSelected: boolean = false;
  editDetails: boolean = false;

  @Output() editDone = new EventEmitter();
  @Output() createClicked = new EventEmitter();

  //Move outside of this class
  colNameToAdd: string = "";

  componentData = null;
  constructor(private resolver: ComponentFactoryResolver) {

  }

  ngOnInit(): void {
    this.componentData = this.extraComponent;
  }

  onEdit(event) {
    if(this.editDetails) {
      this.editDone.emit(this.inputCols);
    }
    this.editDetails = !this.editDetails;
  }

  onCreate(event) {
    if(this.colNameToAdd !== "") {
      this.createClicked.emit(this.colNameToAdd);
    }
  }
}
