import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundNum' })
export class RoundNumberPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}
