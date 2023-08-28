import { Pipe, PipeTransform } from '@angular/core';
import { join } from 'ramda';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(values: any[], separator: string = ', '): string {
    return join(separator, values);
  }
}
