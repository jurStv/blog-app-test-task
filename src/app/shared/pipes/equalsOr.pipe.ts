import { Pipe, PipeTransform } from '@angular/core';
import { includes } from 'ramda';

@Pipe({
  name: 'equalsOr',
})
export class EqualsOrPipe implements PipeTransform {
  transform(value: any, ...values: any[]): boolean {
    return includes(value, values);
  }
}
