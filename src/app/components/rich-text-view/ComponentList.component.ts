import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Renderer,
  ViewChild, OnInit, ViewChildren, QueryList
} from '@angular/core';
import {TextData} from "./TextData.component";
import {QuantityData} from "./QuantityData.component";
import DynamicComponent from "../utils/dynamic-component/dynamic-component";

@Component({
  selector: 'comp-list',
  styles : [``],
  template: `
      <span *ngFor="let comp of compList">
        <dynamic-component #dcs [componentData]="comp"></dynamic-component>
      </span>
  `
})

/**
 * Allows the user to edit integer data.
 */
export class ComponentList implements AfterViewInit, OnInit {

  compList: any = [];
  startOffset: number;

  selectedComponent: any = null;

  @ViewChildren('dcs') elements: QueryList<DynamicComponent>;
  /**
   * Constructor
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer) { /* */
  }

  ngOnInit() {

  }
  /**
   * This runs after the view is initialized
   */
  ngAfterViewInit() {
    let firstC: any = {
      component: TextData,
      inputs: {inputText: "Quantity Data is <b>something</b> and temperature is something",
               inputId: "text1"}
    }
    this.compList.push(firstC);

    this.changeDetector.detectChanges();
    this.getComponentInstances();
  }

  getComponentInstances() {
    let componentInstances: any = [];
    this.elements.forEach((com: DynamicComponent) => {
      componentInstances.push(com.currentComponent.instance);
      if(com.currentComponent.instance.selected) {
        com.currentComponent.instance.selected.subscribe(
          data => {
            this.selectedComponent = com.currentComponent.instance;
            //console.log("selected ", this.selectedComponent);
          });
      }
    });

    //console.log(componentInstances);
    return componentInstances;
  }

  addComponent(index: number) {
    let returnText = "";
    if(this.selectedComponent) {
      returnText = this.selectedComponent.changeInputText();
    }

    let firstC: any = {
        component: QuantityData,
        inputs: {}
      }
    console.log(returnText);
    let secondC: any = {
      component: TextData,
      inputs: {inputText: returnText,
               inputId: "text2"}
    }
    this.compList.push(firstC);
    this.compList.push(secondC);
    //console.log(this.compList);

    this.changeDetector.detectChanges();
    this.getComponentInstances();
  }
}
