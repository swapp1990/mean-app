import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Editor} from "primeng/primeng";

@Component({
  selector: 'rich-text',
  template: ` <p-editor [(ngModel)]="text" [style]="{'height':'320px'}">
                <header>
                    <button pButton icon="fa-check"></button>
                </header>
              </p-editor> 
              <p>Value: {{text||'empty'}}</p>
              <input value="sss">
            `
})

export class RichTextComponent implements OnInit {

  text: string;
  picklistUnits: string[];

  constructor() {}

  ngOnInit(): void {
    this.picklistUnits = ["cm, mm"];
    this.text = `<b> My bold Value  <input value="sss"> </b>`;
  }

}
