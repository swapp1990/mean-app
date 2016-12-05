import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Renderer,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'quantity-data',
  styles : [`

    .quantitySpan {
        padding: 0px 10px 0px 10px
    } 
    
    .quantityInputNumber {
        width:100px; display:inline-block;
    }
    
    .quantityInputPicklist {
        width:100px; 
        display:inline-block; 
        border: none;
        background-color: transparent
    }
    
    .quantitySelectPicklist{
       display:inline-block;
       margin:10px; 
       border: 1px solid #bebebe
    }

`],
  template: `
<span class="quantitySpan">
    <input 
      #myInput
      type="number"
      class="quantityInputNumber"
      [(ngModel)]="descriptor.value">
    <!-- Units -->
    <select 
       #mySelect
      class="quantitySelectPicklist">
      <option 
        *ngFor="let item of descriptor.picklistUnits" 
        [value]="item.id">{{item.label}}</option>
    </select>
  </span>
  `
})

/**
 * Allows the user to edit integer data.
 */
export class QuantityData implements AfterViewInit {
  @ViewChild('myInput') myInput;
  descriptor: any = {value: "", picklistUnits: ["cm", "mm"]};
  /**
   * Constructor
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer) { /* */
  }

  /**
   * This runs after the view is initialized
   */
  ngAfterViewInit() {
    this.descriptor = {value: "", picklistUnits: ["cm", "mm"]};
  }
}
