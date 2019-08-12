import { Request } from 'express';

export const getCountryCodeFromQueryParams =
  (req: Request) => req.query['country-code'];

export const getIsVeganFromQueryParams =
  (req: Request) => req.query['is-vegan'];

export const getIsVegetarianFromQueryParams =
  (req: Request) => req.query['is-vegetarian'];
