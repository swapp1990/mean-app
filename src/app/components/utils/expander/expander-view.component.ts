import {
  Component, ViewChild, EventEmitter, Input, OnInit, Output, Injector, ElementRef,
  ComponentFactoryResolver, ViewContainerRef, AfterViewInit
} from "@angular/core";
import {MyProgressBar} from "../progress-bar/progress-bar.component";
import DynamicComponent from "../dynamic-component/dynamic-component";
import {DetailsView} from "../../expense-app/details-view/details-view.component";

@Component({
  selector: 'my-expander',
  entryComponents: [],
  template: ` 
              <dynamic-component #dc [componentData]="componentData"></dynamic-component>
            `
})

export class MyExpander implements OnInit, AfterViewInit {

  @Input() renderedComponent: any = null;

  @Output() editDone = new EventEmitter();

  @ViewChild('dc') dynamic: DynamicComponent;

  componentData = null;
  constructor() {

  }

  ngOnInit(): void {
    this.componentData = this.renderedComponent;
    //console.log("Init Expander");
  }

  ngAfterViewInit(): void {
    //console.log("After Init Expander ", this.dynamic.currentComponent.instance);
    let detailsView: DetailsView = this.dynamic.currentComponent.instance;
    if(detailsView) {
      detailsView.updateDetails.addListener("Update",
        data => {
          console.log("Update This ", data);
          this.editDone.emit(data);
      });
      //detailsView.checkForUpdates();
    }
  }
}
