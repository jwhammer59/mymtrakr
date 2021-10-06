import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(numToFormat: string): string {
    const areaCodeNumbers = numToFormat.slice(0, 3);
    const tempNumbers = numToFormat.slice(3);
    const localNumbers = tempNumbers.slice(0, 3);
    const endNumbers = tempNumbers.slice(3);
    return `(${areaCodeNumbers}) ${localNumbers}-${endNumbers} `;
  }
}
