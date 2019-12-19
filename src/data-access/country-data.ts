import { queryPostgres, getSqlQuery } from '../postgres';
import { ICountry } from '@chrisb-dev/seasonal-shared';

export const getAllCountries = async (): Promise<ICountry[]> => {
  const getAllCountriesQuery = await getSqlQuery('get-countries.sql');
  const result = await queryPostgres<ICountry>(getAllCountriesQuery);
  return result.rows;
};
