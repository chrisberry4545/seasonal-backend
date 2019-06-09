import { Cache } from './cache';

export const cacheFunctionResponse = <T, I extends string | number>(
  cache: Cache<T>,
  cacheKey: string,
  functionToGetData: (...args: I[]) => Promise<T>
) => {
  return async (...args: I[]): Promise<T> => {
    const constructedKey =
      cacheKey + args.map((arg) => arg.toString()).join(':');
    const cachedData = cache.get(constructedKey);
    if (cachedData) {
      return Promise.resolve(cachedData);
    }
    const result = await functionToGetData(...args);
    cache.set(constructedKey, result);
    return result;
  };
};
