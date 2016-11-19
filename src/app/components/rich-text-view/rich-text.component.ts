import {Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {Editor} from "primeng/primeng";
declare var Quill:any;

@Component({
  selector: 'rich-text',
  styleUrls: ['rich-text.component.css'],
  template: ` <div style="position: relative">
                <div id="editor">
                </div>
                <ul class="completions">
                </ul>
                <div id="tooltip-controls">
                  <button pButton icon="fa fa-circle-o" (click)="onClick()"></button>
                </div>
              </div>
              <p>Value: {{text||'empty'}}</p>
            `
})

export class RichTextComponent implements AfterViewInit {

  text: string;
  picklistUnits: string[];

  insertText: any = "Test ";
  quill: any;
  cursorPosition: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.picklistUnits = ["cm, mm"];
    this.text = ``;
    this.quill = new Quill('#editor', {
      placeholder: 'Compose an epic...',
      theme: 'snow',
      modules: {
        mentions: {
          container: '.completions',  //On the html
          onClose: val => this.onClose(),
          onOpen: () => console.log("Opening"),
          users: [
            {id: 1, name: 'Christy'},
            {id: 2, name: 'Micha'},
            {id: 3, name: 'Sima'},
            {id: 4, name: 'Coreen'},
            {id: 5, name: 'Aimee'},
            {id: 6, name: 'Brant'},
            {id: 7, name: 'Maryetta'},
            {id: 8, name: 'Nicol'},
            {id: 9, name: 'Thresa'},
            {id: 10, name: 'Pura'},
            {id: 11, name: 'Audie'},
            {id: 12, name: 'Jacob'},
            {id: 13, name: 'Mika'},
            {id: 14, name: 'Nubia'},
            {id: 15, name: 'Ana'},
            {id: 16, name: 'Sudie'},
            {id: 17, name: 'Raymundo'},
            {id: 18, name: 'Carolyne'},
            {id: 19, name: 'Doretha'},
            {id: 20, name: 'Milo'},
          ]
        }
      }
    });
  }

  ngAfterViewInit(): void {

  }

  onClick() {
    var index = this.quill.getSelection(true).index;
    this.quill.insertEmbed(index,"s-input","Test");
    this.text = this.quill.container.firstChild.innerHTML;
  }

  onClose() {
    this.text = this.quill.container.firstChild.innerHTML;
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
