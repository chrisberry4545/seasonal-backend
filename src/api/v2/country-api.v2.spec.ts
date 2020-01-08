import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, COUNTRY_ENDPOINT } from '../../config';
import { ICountry, IRegion } from '@chrisb-dev/seasonal-shared';

const countryUrl = `${V2_ENDPOINT}/${COUNTRY_ENDPOINT}`;

describe('Get countries', () => {
  let response: Response;
  let result: ICountry[];
  let allRegions: IRegion[];
  beforeAll(async () => {
    response = await supertest(app).get(`/${countryUrl}`);
    result = response.body;
    allRegions = result.reduce((regions, country) => [
      ...regions,
      ...country.regions
    ], [] as IRegion[]);
  });

  test('Returns a status of 200', () => {
    expect(response.status).toBe(200);
  });
  test('Retrieves a single food item', async () => {
    expect(result).toMatchSnapshot();
  });
  test('Returns multiple countries', () => {
    expect(result.length > 0).toBe(true);
  });
  test('Populates every countries id', () => {
    const areAllIdsDefined =
      result.every((country) => country.id !== undefined);
    expect(areAllIdsDefined).toBe(true);
  });
  test('Populates every countries name', () => {
    const areAllNamesDefined =
      result.every((country) => country.name !== undefined);
    expect(areAllNamesDefined).toBe(true);
  });
  test('Every countries has regions', () => {
    const doAllCountriesHaveRegions =
      result.every((country) => country.regions.length > 0);
    expect(doAllCountriesHaveRegions).toBe(true);
  });
  test('Populates every regions name', () => {
    const allRegionsNamesDefined = allRegions
      .every((region) => region.name !== undefined);
    expect(allRegionsNamesDefined).toBe(true);
  });
  test('Populates every regions code', () => {
    const allRegionsCodesDefined = allRegions
      .every((region) => region.code !== undefined);
    expect(allRegionsCodesDefined).toBe(true);
  });
});
