import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(numToFormat: string): string {
    const areaNums = numToFormat.slice(0, 3);
    const tempNum = numToFormat.slice(3);
    const localNums = tempNum.slice(0, 3);
    const endNum = tempNum.slice(3);
    return '(' + areaNums + ')' + ' ' + localNums + '-' + endNum;
  }
}
