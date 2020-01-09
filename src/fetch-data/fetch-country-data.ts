import {
  Cache, cacheFunctionResponse
} from '../cache';

import { ICountry } from '@chrisb-dev/seasonal-shared';
import { getAllCountries } from '../data-access';

const allCountryDataCache = new Cache<ICountry[]>();
const allCountryDataCacheKey = 'single-food';

export const fetchAllCountryData = cacheFunctionResponse(
  allCountryDataCache,
  allCountryDataCacheKey,
  (): Promise<ICountry[]> => getAllCountries()
);
