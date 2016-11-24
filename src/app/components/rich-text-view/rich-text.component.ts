import {
  Component, OnInit, ViewChild, Input, AfterViewInit, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, Compiler
} from '@angular/core';
import { Router } from '@angular/router';
import {Editor} from "primeng/primeng";
import {TestComponent} from "./test-comp.component";
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
              <span #insertComponentHere></span>
              <p>Value: {{text||'empty'}}</p>
            `
})

export class RichTextComponent implements AfterViewInit {

  text: string;
  picklistUnits: string[];

  insertText: any = "Test ";
  quill: any;
  cursorPosition: number = 0;

  @ViewChild(TestComponent) other;
  @ViewChild("insertComponentHere", { read: ViewContainerRef }) insertComponentHere: ViewContainerRef;
  constructor() {

  }

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
          ]
        }
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.other.getHtmlContent());
  }

  onClick() {
    // this.componentResolver.resolveComponent(TestComponent).then((factory: ComponentFactory<any> ) => {
    //   let comp = this.insertComponentHere.createComponent(factory);
    //   console.log(comp);
    //   //comp.instance.descriptor = this.descriptor;
    // });
    var index = this.quill.getSelection(true).index;
    let htmlValue = this.other.getHtmlContent();
    this.quill.insertEmbed(index,"s-angular", htmlValue);
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
