import {
  Component, OnInit, ViewChild, Input, AfterViewInit, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, Compiler, ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import {Editor} from "primeng/primeng";
import {TestComponent} from "./test-comp.component";
import {ComponentList} from "./ComponentList.component";
declare var Quill:any;

@Component({
  selector: 'rich-text',
  styleUrls: ['rich-text.component.css'],
  template: ` 
            <div #test contenteditable (keyup)="onKeyUp($event)">
                <comp-list #cl></comp-list>
            </div>
            <button pButton type="text" (click)="onCreate($event)" icon="fa-plus"></button>
            <button pButton type="text" (click)="onBold($event)" icon="fa-bold"></button>
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
  @ViewChild('cl') compList: ComponentList;
  componentData = null;

  @ViewChild("insertComponentHere", { read: ViewContainerRef }) insertComponentHere: ViewContainerRef;
  constructor(private elementRef: ElementRef) {
    this.elRef = elementRef;
  }

  ngOnInit(): void {
    this.picklistUnits = ["cm, mm"];
    this.text = ``;
    var el1 = document.getElementById("test");
  }

  onCreate(event) {
    this.compList.addComponent(this.compList.startOffset);
  }

  onKeyUp(event) {
    //console.log(event);
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    //console.log(range);
    console.log(this.compList.selectedComponent);
    this.compList.selectedComponent.inputText = range.startContainer.textContent;
    this.compList.selectedComponent.indexFrom = range.startOffset;
  }

  ngAfterViewInit(): void {
    //console.log(this.other.getHtmlContent());
    //console.log(this.el.nativeElement.selectionStart);
  }

  onClose() {
    this.text = this.quill.container.firstChild.innerHTML;
  }

  selectionChanged(event) {
    let range = this.quill.getSelection();
    if (range) {
      if (range.length == 0) {
        console.log('User cursor is at indexFrom', range.index);
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

  onBold() {
    this.compList.selectedComponent.onBold();
  }

}
