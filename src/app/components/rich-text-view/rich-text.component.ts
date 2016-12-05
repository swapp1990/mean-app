import {
  Component, OnInit, ViewChild, Input, AfterViewInit, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, Compiler, ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import {Editor} from "primeng/primeng";
import {TestComponent} from "./test-comp.component";
declare var Quill:any;

@Component({
  selector: 'rich-text',
  styleUrls: ['rich-text.component.css'],
  template: ` 
            <div #test>
                <!--<dynamic-component [componentData]="componentData"></dynamic-component>-->
                <text-data [inputText]=""></text-data>
                <quantity-data></quantity-data>
                <text-data></text-data>
            </div>
            {{model}}
            `
})

export class RichTextComponent implements AfterViewInit {

  text: string;
  picklistUnits: string[];
  elRef: ElementRef
  insertText: any = "Test ";
  quill: any;
  cursorPosition: number = 0;
  model = 'some text';

  @ViewChild('test') el:ElementRef;

  componentData = null;

  @ViewChild("insertComponentHere", { read: ViewContainerRef }) insertComponentHere: ViewContainerRef;
  constructor(private elementRef: ElementRef) {
    this.elRef = elementRef;
  }

  ngOnInit(): void {
    this.picklistUnits = ["cm, mm"];
    this.text = ``;
    var el1 = document.getElementById("test");
    // this.quill = new Quill('#editor', {
    //   placeholder: 'Compose an epic...',
    //   theme: 'snow',
    //   modules: {
    //     mentions: {
    //       container: '.completions',  //On the html
    //       onClose: val => this.onClose(),
    //       onOpen: () => console.log("Opening"),
    //       users: [
    //         {id: 1, name: 'Christy'},
    //       ]
    //     }
    //   }
    // });

  }

  onClick(event) {
    var range = document.createRange();
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    console.log(range);
  }

  onKeyUp(event) {
    console.log(event);
  }

  ngAfterViewInit(): void {
    //console.log(this.other.getHtmlContent());
    console.log(this.el.nativeElement.selectionStart);
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
