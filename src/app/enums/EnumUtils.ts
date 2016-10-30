import {Month} from "./months";
import {CategoryName} from "./categories";

export class EnumUtils {

  static getMonthsString(): string[] {
    var months: string[] = [];
    for(let n in Month) {
      if(typeof Month[n] === 'number') months.push(n);
    }
    //console.log(months);
    return months;
  }

  static getCategoriesString(): string[] {
    var categories: string[] = [];
    for(let n in CategoryName) {
      if(typeof CategoryName[n] === 'number') categories.push(n);
    }
    return categories;
  }
}
