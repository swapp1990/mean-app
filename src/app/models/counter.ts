export class CounterData {
  _id: string;
  counter: number;
  datePerformed: number;
  percentageGot: number;

  parentId: string;
  type: string;
  isFinished: boolean;

  constructor(parentId: string, counter: number, datePerformed: number, percentageGot: number) {
    this.parentId = parentId;
    this.counter = counter;
    this.datePerformed = datePerformed;
    this.percentageGot = percentageGot;

    this.type = "CheckBox";
    this.isFinished = false;
  }
}
