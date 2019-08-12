import { Cache } from './cache';

export const cacheFunctionResponse = <T>(
  cache: Cache<T>,
  cacheKey: string,
  functionToGetData: (...args: any[]) => Promise<T>
) => {
  return async (...args: any[]): Promise<T> => {
    const constructedKey =
      cacheKey + args.filter(Boolean).map((arg) => arg.toString()).join(':');
    const cachedData = cache.get(constructedKey);
    if (cachedData) {
      return Promise.resolve(cachedData);
    }
    const result = await functionToGetData(...args);
    cache.set(constructedKey, result);
    return result;
  };
};
