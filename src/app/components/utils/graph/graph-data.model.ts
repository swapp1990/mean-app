import {EnumUtils} from "../../../enums/EnumUtils";
export class GraphDataSet {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;

  constructor(label, data) {
    this.label = label;
    this.data = data;
    this.fill = false;
  }
}

export class GraphData {
  labels: string[];
  datasets: GraphDataSet[];

  constructor() {
    this.labels = EnumUtils.getMonthsString();
    this.datasets = [];
  }

  addOrUpdateDataset(dataset: GraphDataSet) {
    let dataSetFound = false;
    for(let i = 0; i < this.datasets.length; i++) {
      let set: GraphDataSet = this.datasets[i];
      if(set.label === dataset.label) {
        this.datasets[i] = dataset;
        dataSetFound = true;
      }
    }
    if(!dataSetFound) {
      this.datasets.push(dataset);
    }
  }
}
