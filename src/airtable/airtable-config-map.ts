import {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_DB,
  AUS_NSW_AIRTABLE_API_KEY,
  AUS_NSW_AIRTABLE_BASE_DB,
  AUS_WA_AIRTABLE_API_KEY,
  AUS_WA_AIRTABLE_BASE_DB
} from '../config';
import { COUNTRY_CODES } from '../data';

interface IAirtableConfig {
  apiKey: string | undefined;
  database: string;
}

const DEFAULT_AIRTABLE_CONFIG: IAirtableConfig = {
  apiKey: AIRTABLE_API_KEY,
  database: AIRTABLE_BASE_DB
};

const AIRTABLE_CONFIG_MAP: {
  [key: string]: IAirtableConfig
} = {
  [COUNTRY_CODES.AUSTRALIA_WESTERN_AUSTRALIA]: {
    apiKey: AUS_WA_AIRTABLE_API_KEY,
    database: AUS_WA_AIRTABLE_BASE_DB
  },
  [COUNTRY_CODES.AUSTRALIA_NEW_SOUTH_WALES]: {
    apiKey: AUS_NSW_AIRTABLE_API_KEY,
    database: AUS_NSW_AIRTABLE_BASE_DB
  },
  [COUNTRY_CODES.UNITED_KINGDOM]: DEFAULT_AIRTABLE_CONFIG
};

export const getAirtableConfig = (countryCode: string = 'GBR') => {
  return AIRTABLE_CONFIG_MAP[countryCode] || DEFAULT_AIRTABLE_CONFIG;
};
