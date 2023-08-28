import { Pipe, PipeTransform } from '@angular/core';
import { concat, lastIndexOf, slice } from 'ramda';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (value.length <= limit) {
      return value;
    }

    let newLimit = limit;

    if (completeWords) {
      newLimit = lastIndexOf(slice(0, limit, value), ' ');

      if (newLimit < 0) {
        newLimit = 25
      }
    }

    return concat(slice(0, newLimit, value), ellipsis);
  }
}
