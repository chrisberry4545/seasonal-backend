import { queryPostgres } from '../postgres';
import { ICountry } from '@chrisb-dev/seasonal-shared';

const countryQuery = `
  SELECT
    countries.id,
    countries.name,
    (
      SELECT json_agg(
        json_build_object(
          'code' , regions.code,
          'name', regions.name,
          'latLng', json_build_object(
            'lat', regions.lat,
            'lng', regions.lng
          )
        )
        ORDER BY regions.name
      ) AS regions
      FROM regions
      WHERE regions.country_id = countries.id
    )
  FROM countries
  ORDER BY countries.name
`;

export const getAllCountries = async (): Promise<ICountry[]> => {
  const result = await queryPostgres<ICountry>(countryQuery);
  return result.rows;
};
