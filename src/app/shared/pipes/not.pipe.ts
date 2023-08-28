import { Pipe, PipeTransform } from '@angular/core';
import { not } from 'ramda';

@Pipe({
  name: 'not',
})
export class NotPipe implements PipeTransform {
  transform(value: any): boolean {
    return not(value);
  }
}
