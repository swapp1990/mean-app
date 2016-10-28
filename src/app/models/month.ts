export class MonthData {
  _id: string;
  name: string;
  price: number;
  category: string;
  payment: string;
  type: string;
  date: number;

  constructor() {
    this.name = "";
    this.price = 0;
    this.category = "Grocery";
    this.payment = "D";
    this.type = "";
    this.date = 1;
  }
}
