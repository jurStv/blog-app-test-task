import { Pipe, PipeTransform } from '@angular/core';
import { head } from 'ramda';

@Pipe({
  name: 'head'
})
export class HeadPipe implements PipeTransform {
  transform<T = any>(value: T[],): T {
    return head(value);
  }
}
