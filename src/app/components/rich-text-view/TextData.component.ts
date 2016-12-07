import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Renderer,
  ViewChild, SimpleChanges, OnChanges, Injector, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'text-data',
  styles : [``],
  template: `
  <span class="test" [attr.id]="inputId" [innerHTML]="inputText" (keyup)="onKeyUp($event)" (click)="onClick($event)"></span>
  `
})

/**
 * Allows the user to edit text data.
 */
export class TextData implements AfterViewInit, OnChanges {
  inputText: string;
  inputId: string = "";
  indexFrom: number = 0;
  indexTo: number = 0;

  @Output() selected = new EventEmitter();

  /**
   * Constructor
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer,
    private injector: Injector) { /* */
      this.inputText = this.injector.get('inputText');
       this.inputId = this.injector.get('inputId');
  }

  /**
   * This runs after the view is initialized
   */
  ngAfterViewInit() {
    //this.inputText = "<b>Test</b>";
  }

  onKeyUp(event) {
    console.log(this.inputText);
  }

  onClick(event) {
    var el = document.getElementById("text1");
    var elements = document.getElementsByClassName("test");
    
    console.log("Range ", range);
    console.log(elements);
    var range = this.getCaretCharacterOffsetWithin(el);

    this.indexFrom = range;
    this.indexTo = range;
    this.selected.emit("Select");
  }

  getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        console.log("Range ", range);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        //console.log(preCaretRange);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
        console.log(caretOffset);
      }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

  changeInputText() {
    var el = document.getElementById("text1");
    var range = document.createRange();
    range.selectNodeContents(el);
    //console.log(range.startContainer.textContent);
    let input = range.startContainer.textContent;

    let returnText = input.substring(this.indexTo, input.length);
    this.inputText = input.substring(0, this.indexFrom);
    console.log("Change Input");
    return returnText;
  }

  onBold() {
    let preString = this.inputText.substring(0, this.indexFrom);
    let subString = this.inputText.substring(this.indexFrom, this.indexTo);
    subString = '<b>' + subString + '</b>';
    let postString = this.inputText.substring(this.indexTo, this.inputText.length);
    this.inputText = preString + subString + postString;
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log("Changes ", changes);
  }
}
