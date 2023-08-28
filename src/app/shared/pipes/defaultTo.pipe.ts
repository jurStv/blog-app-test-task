import { Pipe, PipeTransform } from '@angular/core';
import { defaultTo } from 'ramda';

@Pipe({
  name: 'defaultTo',
})
export class DefaultToPipe implements PipeTransform {
  transform<T = any>(value: T, defaultValue: T): T {
    return defaultTo(defaultValue, value);
  }
}
