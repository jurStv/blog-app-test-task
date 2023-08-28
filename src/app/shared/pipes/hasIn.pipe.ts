import { Pipe, PipeTransform } from '@angular/core';
import { hasIn } from 'ramda';

@Pipe({
  name: 'hasIn'
})
export class HasInPipe implements PipeTransform {
  transform(propName: string, object): boolean {
    return hasIn(propName, object);
  }
}
