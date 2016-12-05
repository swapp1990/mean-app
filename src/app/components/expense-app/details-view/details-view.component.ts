import {Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import { Router } from '@angular/router';
import {EducationLoan} from "./education-loan.dyn.component";

@Component({
  selector: 'details-view',
  template: `<h1> Details </h1>
             <dynamic-component [componentData]="componentData"></dynamic-component>
            `
})
export class DetailsView implements OnInit {

  componentData = null;
  constructor(private resolver: ComponentFactoryResolver) {

  }

  ngOnInit(): void {
    this.componentData = {
      component: EducationLoan,
      inputs: {}
    };
  }
}
