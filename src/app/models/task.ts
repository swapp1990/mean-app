import {CounterData} from "./counter";
export class TaskData {
  _id: string;
  name: string;
  percentage: number;
  weight: number;
  counterMax: number;
  category: string[];
  month: string;
  counters: CounterData[];

  constructor(month: string, category: string[]) {
    this.name = "S";
    this.percentage = 100;
    this.weight = 5;
    this.counterMax = 1;
    this.category = category;
    this.month = month;
  }
}
