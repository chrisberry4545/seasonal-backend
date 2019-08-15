import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, COUNTRY_ENDPOINT } from '../../config';
import { ICountry, IRegion } from '@chrisb-dev/seasonal-shared';

const countryUrl = `${V2_ENDPOINT}/${COUNTRY_ENDPOINT}`;
const getAllRegionsFromCountries = (countries: ICountry[]): IRegion[] => (
  countries.reduce((regions, country) => [
    ...regions,
    ...country.regions
  ], [] as IRegion[])
);

describe('Get countries', () => {
  let response: Response;
  beforeAll(async () => {
    response = await supertest(app).get(`/${countryUrl}`);
  });

  test('Returns a status of 200', () => {
    expect(response.status).toBe(200);
  });
  test('Retrieves a single food item', () => {
    expect(response.body).toMatchSnapshot();
  });
  test('Returns multiple countries', () => {
    expect(response.body.length > 0).toBe(true);
  });
  test('Populates every countries id', () => {
    const areAllIdsDefined =
      response.body.every((country: ICountry) => country.id !== undefined);
    expect(areAllIdsDefined).toBe(true);
  });
  test('Populates every countries name', () => {
    const areAllNamesDefined =
      response.body.every((country: ICountry) => country.name !== undefined);
    expect(areAllNamesDefined).toBe(true);
  });
  test('Every countries has regions', () => {
    const doAllCountriesHaveRegions =
      response.body.every((country: ICountry) => country.regions.length > 0);
    expect(doAllCountriesHaveRegions).toBe(true);
  });
  test('Populates every regions name', () => {
    const allRegionsNamesDefined = getAllRegionsFromCountries(response.body)
      .every((region) => region.name !== undefined);
    expect(allRegionsNamesDefined).toBe(true);
  });
  test('Populates every regions code', () => {
    const allRegionsCodesDefined = getAllRegionsFromCountries(response.body)
      .every((region) => region.code !== undefined);
    expect(allRegionsCodesDefined).toBe(true);
  });
});
