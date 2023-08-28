import { Pipe, PipeTransform } from '@angular/core';
import {prop} from 'ramda';

@Pipe({
  name: 'prop',
})
export class PropPipe implements PipeTransform {
  transform(value: any, propName: string): unknown {
    return prop(propName, value);
  }
}
