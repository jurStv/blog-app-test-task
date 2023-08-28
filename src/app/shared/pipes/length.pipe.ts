import { Pipe, PipeTransform } from '@angular/core';
import { length } from 'ramda';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {
  transform(obj: string | any[]): number {
    return length(obj);
  }
}
