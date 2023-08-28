import { Pipe, PipeTransform } from '@angular/core';
import { prepend } from 'ramda';

@Pipe({
  name: 'prepend',
})
export class PrependPipe implements PipeTransform {
  transform(value: any, rest: any[]) {
    return prepend(value, rest);
  }
}
