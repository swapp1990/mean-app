import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TreeNodeData} from "./treeNode";
import {MenuItem} from "primeng/primeng";
import {TaskData} from "../../../models/task";

@Component({
  selector: 's-tree',
  template: `<p-tree [value]="treeData"
                      selectionMode="single"
                      [(selection)]="selectedNode"
                     (onNodeSelect)="nodeSelected($event)"
                     [style]="{'max-height':'200px','overflow':'auto', 'width':'700px'}"
                     [contextMenu]="cm">
                     
                <template let-node  pTemplate type="editable">
                  <input [(ngModel)]="node.data.name" type="text" style="'width': '20px'">
                  <input [(ngModel)]="node.data.weight" type="text" style="'width': '20px'">
                  <input [(ngModel)]="node.data.counterMax" type="text" style="'width': '20px'">
                  <button pButton type="button" icon="fa-check" iconPos="left" (click)="onClick()"></button>
                </template>
                <template let-node  pTemplate type="create-new">
                  <button *ngIf="!node.plusClicked" pButton type="button" icon="fa-plus" iconPos="left" (click)="onPlus()"></button>
                  <div *ngIf="node.plusClicked">
                    <input [(ngModel)]="node.data.name" type="text" style="'width': '20px'">
                    <input [(ngModel)]="node.data.weight" type="text" style="'width': '20px'">
                    <input [(ngModel)]="node.data.counterMax" type="text" style="'width': '20px'">
                    <button pButton type="button" icon="fa-check" iconPos="left" (click)="onPlus()"></button>
                  </div>
                </template>
                
                <template let-node  pTemplate type="check-box">
                  <div *ngIf="!node.plusClicked">
                       <span class="label label-default">{{node.label}}</span>
                  </div>
                  <!--<div *ngIf="node.plusClicked">-->
                       <!--<span class="label label-default">{{node.label}}</span>-->
                  <!--</div>-->
                </template>
              </p-tree>
              <p-contextMenu #cm [model]="items"></p-contextMenu>
              `
})

export class TreeView implements OnInit {
  @Input() treeData: TreeNodeData[];
  @Output() onCreate = new EventEmitter();
  @Output() onUpdate = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  items: MenuItem[];
  selectedNode: TreeNodeData;

  constructor() {

  }

  ngOnInit(): void {
    this.items = [
      {label: 'Delete', icon: 'fa-remove', command: (event) => this.deleteNode()},
      {label: 'Edit', icon: 'fa-pencil', command: (event) => this.editNode()}
    ];
  }

  editNode() {
    console.log(this.selectedNode.type);
    if(this.selectedNode.type === "check-box") {
      this.selectedNode.setType("counter-editable");
      console.log(this.selectedNode);
    } else {
      this.selectedNode.setType("editable");
    }

  }

  deleteNode() {
    this.onDelete.emit(this.selectedNode.data);
  }

  nodeSelected(event) {
    this.selectedNode.plusClicked = !this.selectedNode.plusClicked;

  }

  onClick() {
    this.onUpdate.emit(this.selectedNode.data);
    this.selectedNode.setType("default");
  }

  onPlus() {
    if(this.selectedNode) {
      this.selectedNode.plusClicked = !this.selectedNode.plusClicked;
      if(!this.selectedNode.plusClicked) {
        this.onCreate.emit(this.selectedNode.data);
      }
    }
  }
}
