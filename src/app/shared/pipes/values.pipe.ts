import { Pipe, PipeTransform } from '@angular/core';
import { values } from 'ramda';

@Pipe({
  name: 'values',
})
export class ValuesPipe implements PipeTransform {
  transform(value: any): unknown {
    return values(value);
  }
}
