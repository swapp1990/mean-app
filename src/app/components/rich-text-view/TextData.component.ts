import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Renderer,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'text-data',
  styles : [``],
  template: `
  <span contenteditable> 
    {{inputText}}
  </span>
  `
})

/**
 * Allows the user to edit integer data.
 */
export class TextData implements AfterViewInit {
  @Input() inputText: string;

  /**
   * Constructor
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer) { /* */
  }

  /**
   * This runs after the view is initialized
   */
  ngAfterViewInit() {
    this.inputText = "<b>Test</b>";
  }
}
