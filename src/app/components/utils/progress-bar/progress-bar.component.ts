import {Component, OnInit, Input, Injector, AfterViewInit} from "@angular/core";

@Component({
  selector: 'my-progress-bar',
  template: `
              <p-progressBar [value]="value"></p-progressBar>
            `
})

export class MyProgressBar implements AfterViewInit {
  value: number = 0;
  @Input() showNum = 0;

  constructor() {
    //this.showNum = this.injector.get('showNum');
  }

  ngAfterViewInit(): void {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if(this.value >= this.showNum) {
        this.value = this.showNum;
        console.log("Number ", this.showNum);
        clearInterval(interval);
      }
    }, 100);
  }

  selectData(event) {

  }
}
