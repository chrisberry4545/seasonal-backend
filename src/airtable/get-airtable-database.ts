import {
  AIRTABLE_BASE_DB,
  AUS_SYDNEY_AIRTABLE_BASE_DB,
  AUS_PERTH_AIRTABLE_BASE_DB,
  AUS_MELBOURNE_AIRTABLE_BASE_DB
} from '../config';
import { COUNTRY_CODES } from '../data';

const DEFAULT_AIRTABLE_DB = AIRTABLE_BASE_DB;

const AIRTABLE_CONFIG_MAP: {
  [key: string]: string
} = {
  [COUNTRY_CODES.AUSTRALIA_MELBOURNE]: AUS_MELBOURNE_AIRTABLE_BASE_DB,
  [COUNTRY_CODES.AUSTRALIA_PERTH]: AUS_PERTH_AIRTABLE_BASE_DB,
  [COUNTRY_CODES.AUSTRALIA_SYDNEY]: AUS_SYDNEY_AIRTABLE_BASE_DB,
  [COUNTRY_CODES.GREAT_BRITAIN]: DEFAULT_AIRTABLE_DB
};

export const getAirtableDatabase = (countryCode: string = 'GBR') => {
  return AIRTABLE_CONFIG_MAP[countryCode] || DEFAULT_AIRTABLE_DB;
};