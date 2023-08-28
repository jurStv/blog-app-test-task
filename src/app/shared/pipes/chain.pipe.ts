import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chain',
})
export class ChainPipe implements PipeTransform {
  transform(value: Promise<any>, otherValue: Promise<any>): Promise<any> {
    return value.then(() => otherValue);
  }
}
