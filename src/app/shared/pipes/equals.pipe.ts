import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equals',
})
export class EqualsPipe implements PipeTransform {
  transform(value: any, value2: any): boolean {
    return value === value2;
  }
}
