import { compose, not, isEmpty, complement, isNil, equals, propEq, curryN, path, sort, is, assocPath } from 'ramda';
import { Observable } from 'rxjs';

export const deepCopy = <T>(data: T): T => JSON.parse(JSON.stringify(data));

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const decodeSafely = (arg) => {
  try {
    return JSON.parse(arg);
  } catch (e) {
    return arg;
  }
};

export function isJsonString(str: string): boolean {
  if (not(is(String, str))) {
    return false;
  }

  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }

  return true;
}

export const isNotEmpty = compose(not, isEmpty);
export const existing = complement(isNil);
export const notEqual = complement(equals);
export const propNotEqual = complement(propEq);

export const log = curryN(2, (str: string, value: any) => console.log(str, value))

export function sortByDate(props: string[], arr: any[]): any[] {
  return sort(
    (a, b) => Number(new Date(path(props, b))) - Number(new Date(path(props, a))),
    arr
  );
}

export const pickNested = (props: string[], obj: any) => {
  let newObj = {};
  props.forEach((prop) => {
    const pathToPick = prop.split('.');
    const value = path(pathToPick, obj);

    if (existing(value)) {
      newObj = assocPath(pathToPick, value, newObj);
    }
  });

  return newObj;
}

export const snakeCase = (originalTxt: string) => originalTxt.replace(/\s/g, '_');

export function customDistinctUntilChanged<T>(comparator: (prev: T, cur: T) => boolean) {
  let isFirst = true;
  let prev: T;

  return function(source: Observable<T>): Observable<T> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(cur) {
          if (isFirst || !comparator(prev, cur)) {
            subscriber.next(cur);
          }

          prev = cur;
          isFirst = false;
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });

      return () => subscription.unsubscribe();
    });
  }
}
