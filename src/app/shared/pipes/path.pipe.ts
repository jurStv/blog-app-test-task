import { Pipe, PipeTransform } from '@angular/core';
import {path} from 'ramda';

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {
  transform(value: any, ...props: string[]): unknown {
    return path(props, value);
  }
}
