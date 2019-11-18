import {
  getSeasonDataBySeasonIndex,
  sortHydratedSeasonDataByFood,
  getAllFoodData,
  hydrateSeasonDataWithFood,
  cleanSeasonDataWithFood,
  getRegionByCode,
  getCountryById,
  getRegionToSeasonAndFoodMapDataByIds,
  getCountryToFoodNameDataMapById
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { fetchAllSeasonData } from './fetch-season-data';

const allSeasonsWithFoodCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithFoodCacheKey = 'season-with-food';

const singleSeasonWithFoodCache = new Cache<IHydratedSeason>();
const singleSeasonWithFoodCacheKey = 'single-season-with-foodx';

export const fetchSeasonWithFood = cacheFunctionResponse(
  singleSeasonWithFoodCache,
  singleSeasonWithFoodCacheKey,
  async (
    seasonIndex: number, countryCode?: string
  ): Promise<IHydratedSeason> => {
    const season = await getSeasonDataBySeasonIndex(seasonIndex);
    const region = await getRegionByCode(countryCode);
    const [country, regionToSeasonMap] = await Promise.all([
      getCountryById(region.country[0]),
      getRegionToSeasonAndFoodMapDataByIds(
        season.regionToSeasonAndFoodMap
      )
    ]);
    const countryToFoodMap = country.countryToFoodNameMap
      ? await getCountryToFoodNameDataMapById(country.countryToFoodNameMap)
      : [];
    const allFood = await getAllFoodData();
    return {
      ...season,
      food: regionToSeasonMap.map((item) => {
        const matchingFood = allFood.find((food) => (
          food.id === item.food[0]
        ));
        const matchingFoodName = countryToFoodMap.find((food) => (
          food.id === item.food[0]
        ));
        return {
          ...matchingFood,
          name: matchingFoodName
            ? matchingFoodName.name
            : item.name
        };
      }) as any,
      recipes: undefined,
      regionToSeasonAndFoodMap: undefined
    };
  }
);

export const fetchAllSeasonsWithFood = cacheFunctionResponse(
  allSeasonsWithFoodCache,
  allSeasonsWithFoodCacheKey,
  async (countryCode?: string): Promise<IHydratedSeason[]> => {
    const [region, allFoodData, allSeasonData] = await Promise.all([
      getRegionByCode(countryCode),
      getAllFoodData(),
      fetchAllSeasonData()
    ]);
    const [
      regionToSeasonAndFoodMap,
      country
    ] = await Promise.all([
      getRegionToSeasonAndFoodMapDataByIds(region.regionToSeasonAndFoodMap),
      getCountryById(region.country[0])
    ]);
    const countryToFoodMap = country.countryToFoodNameMap
      ? await getCountryToFoodNameDataMapById(country.countryToFoodNameMap)
      : [];
    const hydratedResult: IHydratedSeason[] = allSeasonData.map((season) => ({
      ...season,
      food: allFoodData.filter(({ seasons }) => (
        seasons && seasons.includes(season.id)
      )).map((food) => ({
        ...food,
        seasons: undefined
      }))
    }));
    return hydratedResult;
  }
);
