import {
  Cache, cacheFunctionResponse
} from '../cache';

import { ICountry } from '@chrisb-dev/seasonal-shared';
import { getAllCountries, getAllRegions, sortByName } from '../data-access';

const allCountryDataCache = new Cache<ICountry[]>();
const allCountryDataCacheKey = 'single-food';

export const fetchAllCountryData = cacheFunctionResponse(
  allCountryDataCache,
  allCountryDataCacheKey,
  async (): Promise<ICountry[]> => {
    const [countries, regions] = await Promise.all([
      getAllCountries(),
      getAllRegions()
    ]);
    return countries.map((country) => ({
      id: country.id,
      name: country.name,
      regions: regions.filter((region) => region.country.includes(country.id))
        .map((region) => ({
          code: region.code,
          latLng: {
            lat: region.lat,
            lng: region.lng
          },
          name: region.name
        })).sort(sortByName)
    })).sort(sortByName);
  }
);
