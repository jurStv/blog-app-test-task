import { delay } from './helpers';

export function Delay(param: number) {
  return (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function (...args) {
      await delay(param);
      const result = await oldFunc.apply(this, args);
      return result;
    };
  };
}
