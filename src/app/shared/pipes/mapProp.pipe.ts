import { Pipe, PipeTransform } from '@angular/core';
import { map, propOr } from 'ramda';

@Pipe({
  name: 'mapProp'
})
export class MapPropPipe implements PipeTransform {
  transform(value: any[], propertyPath: string): any[] {
    const propWithDefault = propOr('propertyNotFound', propertyPath);

    return map(propWithDefault, value);
  }
}
