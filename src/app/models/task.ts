export class TaskData {
  _id: string;
  name: string;
  percentage: number;
  counterMax: number;
  category: string[];
  month: string;

  constructor() {
    this.name = "S";
    this.percentage = 100;
    this.counterMax = 1;
    this.category = [];
    this.month = "November";
  }
}
