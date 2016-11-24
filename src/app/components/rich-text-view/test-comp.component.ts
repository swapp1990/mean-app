import {Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef} from '@angular/core';

@Component({
  selector: 'test-text',
  template: ` <input
                #myInput
                class="form-control"
                type="number"
                (click)="onClick()"
                (change)="onChange()"
                style="width:150px; display:inline-block">
            `
})

export class TestComponent {
  elRef: ElementRef

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
    console.log(this.elRef);
  }

  getHtmlContent() {
    return this.elRef.nativeElement.innerHTML;
  }
}

