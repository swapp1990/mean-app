export class MonthData {
  _id: string;
  name: string;
  price: number;
  category: string;
  payment: string;
  type: string;
  date: number;
  month: string;

  constructor(category: string, month: string) {
    this.name = "";
    this.price = 0;
    this.category = category;
    this.payment = "D";
    this.type = "";
    this.date = 1;
    this.month = month;
  }
}
