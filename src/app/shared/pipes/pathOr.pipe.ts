import { Pipe, PipeTransform } from '@angular/core';
import { pathOr } from 'ramda';

@Pipe({
  name: 'pathOr'
})
export class PathOrPipe implements PipeTransform {
  transform(value: any, defaultValue: any, props: string[]): unknown {
    return pathOr(defaultValue, props, value);
  }
}
