import { Pipe, PipeTransform } from '@angular/core';
import { and } from 'ramda';

@Pipe({
  name: 'and',
})
export class AndPipe implements PipeTransform {
  transform(value: boolean, otherValue: boolean): boolean {
    return and(value, otherValue);
  }
}
