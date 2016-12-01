import {Component, OnInit, Input, Injector} from "@angular/core";

@Component({
  selector: 'my-progress-bar',
  template: `
              <p-progressBar [value]="value"></p-progressBar>
            `
})

export class MyProgressBar implements OnInit {
  value: number = 0;
  showNum = 0;

  constructor(private injector: Injector) {
    this.showNum = this.injector.get('showNum');
  }

  ngOnInit(): void {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if(this.value >= this.showNum) {
        this.value = this.showNum;
        clearInterval(interval);
      }
    }, 10);
  }

  selectData(event) {

  }
}
