export class TreeNodeData {
  label: string; //label of the node.
  data: any; //data represented by the node.
  children: TreeNodeData[]; //children contained by this node.
  expanded: boolean;
  type: string; //For template matching

  //Display stuff
  icon: string;
  expandedIcon: string;
  collapsedIcon: string;

  //Extra stuff
  leaf: boolean; //Used in lazy loading
  orientation: string; //valid values are 'vertical' and 'horizontal'.

  //Should not be here
  plusClicked: boolean = false;

  constructor(label: string, data: any) {
    this.label = label;
    this.data = data;

    //Default
    this.expandedIcon = "fa-circle-o";
    this.collapsedIcon = "fa-circle";
    this.children = [];
    this.plusClicked = false;
  }

  setType(type: string) {
    this.type = type;
  }

  addChildNode(node: TreeNodeData) {
    this.children.push(node);
  }
}
