import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSeconds'
})
export class FormatSecondsPipe implements PipeTransform {

  transform(s: any, args?: any): any {
    // 转换时间格式
    if (s === 0) {
      return '00:00:00';
    }
    if (!s) {
      return '';
    }

    let t;
    if (s > -1) {
      let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = Math.floor(s % 60);

      if (hour === 60) {
        hour = 0;

      }
      if (min === 60) {
        min = 0;
        hour += 1;
      }
      if (parseInt(sec.toFixed(0), 10) === 60) {
        sec = 0;
        min += 1;
      }
      if (hour < 10) {
        t = '0' + hour + ':';
      } else {
        t = hour + ':';
      }
      if (min < 10) { t += '0'; }
      t += min + ':';
      if (sec <= 9) {
        t += `0${sec.toFixed(0)}`;
      } else {
        t += sec.toFixed(0);
      }
    }
    return t;

  }

}
