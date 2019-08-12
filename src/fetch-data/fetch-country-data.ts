import {
  Cache, cacheFunctionResponse
} from '../cache';

import { ICountry } from '@chrisb-dev/seasonal-shared';
import { COUNTRY_DATA } from '../data';

const allCountryDataCache = new Cache<ICountry[]>();
const allCountryDataCacheKey = 'single-food';

export const fetchAllCountryData = cacheFunctionResponse(
  allCountryDataCache,
  allCountryDataCacheKey,
  async (): Promise<ICountry[]> => Promise.resolve(COUNTRY_DATA)
);
