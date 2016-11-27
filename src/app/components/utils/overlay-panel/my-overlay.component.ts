import {Component, ViewChild, Input} from "@angular/core";
import {OverlayPanel} from "primeng/primeng";

@Component({
  selector: 'my-overlay',
  template: ` <p-overlayPanel #op>
                <h1>Overlay</h1>
                <p-dataTable [value]="details" [style]="{'width':'500px'}">
                    <p-column field="val1" header="val1" [sortable]="true"></p-column>
                    <p-column field="val2" header="val2" [sortable]="true"></p-column>
                </p-dataTable>
              </p-overlayPanel>
            `
})

export class MyOverlay {

  @ViewChild('op')
  overlay: OverlayPanel;
  details: any;

  constructor() {

  }

  toggle(data, event) {
    console.log(data.details);
    //Convert Object to array.
    this.overlay.toggle(event);
  }


}
