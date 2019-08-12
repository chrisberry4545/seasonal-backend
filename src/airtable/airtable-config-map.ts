import {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_DB,
  AUS_AIRTABLE_API_KEY,
  AUS_AIRTABLE_BASE_DB
} from '../config';

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
  AUS: {
    apiKey: AUS_AIRTABLE_API_KEY,
    database: AUS_AIRTABLE_BASE_DB
  },
  GBR: DEFAULT_AIRTABLE_CONFIG
};

export const getAirtableConfig = (countryCode: string = 'GBR') => {
  return AIRTABLE_CONFIG_MAP[countryCode] || DEFAULT_AIRTABLE_CONFIG;
};
