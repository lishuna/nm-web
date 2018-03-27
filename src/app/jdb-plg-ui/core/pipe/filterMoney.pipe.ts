import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMoney'
})
export class FilterMoney implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value !== undefined) {
      return value / 100;
    }
  }
}
