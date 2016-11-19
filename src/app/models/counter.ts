export class CounterData {
  _id: string;
  parentId: string;
  counter: number;
  datePerformed: number;
  percentageGot: number;
  isFinished: boolean;

  //For tree template
  type: string;

  constructor(parentId: string, counter: number, datePerformed: number, percentageGot: number) {
    this.parentId = parentId;
    this.counter = counter;
    this.datePerformed = datePerformed;
    this.percentageGot = percentageGot;
    this.isFinished = false;

    this.type = "check-box";
  }
}
