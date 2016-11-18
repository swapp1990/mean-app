import {Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {Editor} from "primeng/primeng";

@Component({
  selector: 'rich-text',
  template: `
              <button pButton icon="fa-check" (click)="onClick()"></button>
              <p>Value: {{text||'empty'}}</p>
            `
})

//<!--<p-editor #editor [(ngModel)]="text"-->
//<!--(onTextChange)="textChanged($event)" (onSelectionChange)="selectionChanged($event)"-->
//<!--[style]="{'height':'320px'}"-->
//<!--[formats]="['bold']">-->
//  <!--<header>-->
//  <!--&lt;!&ndash;<button pButton icon="fa-check" (click)="onclick()"></button>&ndash;&gt;-->
//<!--&lt;!&ndash;<span class="ql-format-group">&ndash;&gt;-->
//<!--&lt;!&ndash;<span title="Bold" class="ql-format-button ql-bold"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;<span class="ql-format-separator"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;<span title="Italic" class="ql-format-button ql-italic"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;<span class="ql-format-separator"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;<span title="Underline" class="ql-format-button ql-underline"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;<span class="ql-format-separator"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;<span title="Strikethrough" class="ql-format-button ql-strike"></span>&ndash;&gt;-->
//<!--&lt;!&ndash;</span>&ndash;&gt;-->
//<!--<input type="text" pInputText [(ngModel)]="insertText"/>-->
//  <!--<button pButton icon="fa-check" (click)="onClick()"></button>-->
//  <!--<button pButton icon="fa-check" (click)="onClick2()"></button>-->
//  <!--</header>-->
//  <!--</p-editor>-->

export class RichTextComponent implements AfterViewInit {

  text: string;
  picklistUnits: string[];

  insertText: any = "Test ";
  quill: any;
  cursorPosition: number = 0;

  @ViewChild(Editor)
  editor: Editor;

  constructor() {}

  ngOnInit(): void {
    this.picklistUnits = ["cm, mm"];
    this.text = `<p> My bold Value </p>`;

  }

  ngAfterViewInit(): void {
    
  }

  onClick() {
    this.quill.insertText(this.cursorPosition, this.insertText);
  }

  onClick2() {
    //let component: string = "Component Label";
    //let cursorPositionHere: number = 0;
    //cursorPositionHere = cursorPositionHere+this.cursorPosition;
    //this.quill.insertText(cursorPositionHere, component);
    //this.quill.formatText(cursorPositionHere, component.length, {                   // unbolds 'hello' and set its color to blue
    //  'bold': false,
    //  'code-block' : true,
    //  'color': 'rgb(255, 255, 255)',
    //  'background' : 'rgb(0,0,0)'
    //});
    //
    //cursorPositionHere = cursorPositionHere + component.length;
    //this.quill.insertText(cursorPositionHere, " : ");
    //let data: string = "Data";
    //let cursorPositionHere2 = cursorPositionHere + data.length;
    ////this.quill.insertText(cursorPositionHere2, data);
    ////this.quill.formatText(cursorPositionHere2, data.length, {                   // unbolds 'hello' and set its color to blue
    ////  'color': 'rgb(255, 255, 255)',
    ////  'background' : 'rgb(255,0,0)'
    ////});
    //this.quill.insertText(cursorPositionHere2, 'Data ', {
    //  'color': 'rgb(255, 255, 0)',
    //  'background' : 'rgb(0,0,0)',
    //  'italic': true
    //});
  }

  selectionChanged(event) {
    let range = this.quill.getSelection();
    if (range) {
      if (range.length == 0) {
        console.log('User cursor is at index', range.index);
        this.cursorPosition = range.index;
      } else {
        var text = this.quill.getText(range.index, range.length);
        console.log('User has highlighted: ', text);
      }
    } else {
      console.log('User cursor is not in editor');
    }
  }

  textChanged(event) {
    this.text = event.htmlValue;
    //console.log(event.source);
  }

}
