import {Component, OnInit, Input} from '@angular/core';
import {TreeNodeData} from "./treeNode";
import {MenuItem} from "primeng/primeng";

@Component({
  selector: 's-tree',
  template: `<p-tree [value]="treeData"
                      selectionMode="single"
                      [(selection)]="selectedNode"
                     (onNodeSelect)="nodeSelected($event)"
                     [contextMenu]="cm">
                <template let-node  pTemplate type="editable">
                  <input [(ngModel)]="node.label" type="text">
                  <button pButton type="button" icon="fa-check" iconPos="left" (click)="onClick()"></button>
                </template>
              </p-tree>
              <p-contextMenu #cm [model]="items"></p-contextMenu>
              `
})

export class TreeView implements OnInit {
  @Input() treeData: TreeNodeData[];
  items: MenuItem[];
  selectedNode: TreeNodeData;

  constructor() {

  }

  ngOnInit(): void {
    this.items = [
      {label: 'Delete', icon: 'fa-remove', command: (event) => null},
      {label: 'Edit', icon: 'fa-pencil', command: (event) => this.editNode()}
    ];
  }

  editNode() {
    this.selectedNode.setType("editable");
  }

  nodeSelected(event) {

  }

  onClick() {
    this.selectedNode.setType("default");
  }

}
