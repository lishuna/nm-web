import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSelected'
})
export class FilterSelected implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      if (value.length >= args) {
        const str = value.substring(0, args) + '...';
        return str;
      } else {
        return value;
      }

    }

  }
}