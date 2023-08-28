import { Pipe, PipeTransform } from '@angular/core';
import { gte } from 'ramda';

@Pipe({
  name: 'gte'
})
export class GtePipe implements PipeTransform {
  transform(value: number, num: number): boolean {
    return gte(value, num);
  }
}
