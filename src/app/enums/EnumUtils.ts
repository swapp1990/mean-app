import {Month} from "./months";
import {ExpenseCategoryName, IncomeCategoryName} from "./categories";

export class EnumUtils {

  static getMonthsString(): string[] {
    var months: string[] = [];
    for(let n in Month) {
      if(typeof Month[n] === 'number') months.push(n);
    }
    //console.log(months);
    return months;
  }

  static getExpenseCategoriesString(): string[] {
    var categories: string[] = [];
    for(let n in ExpenseCategoryName) {
      if(typeof ExpenseCategoryName[n] === 'number') categories.push(n);
    }
    return categories;
  }

  static getIncomeCategoriesString(): string[] {
    var categories: string[] = [];
    for(let n in IncomeCategoryName) {
      if(typeof IncomeCategoryName[n] === 'number') categories.push(n);
    }
    return categories;
  }
}
