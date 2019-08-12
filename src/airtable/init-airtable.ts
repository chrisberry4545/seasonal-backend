import { IAirtable } from '../interfaces';
import { getAirtableConfig } from './airtable-config-map';
// tslint:disable-next-line
const Airtable = require('airtable');

export const initAirtable = (countryCode?: string) => {
  const config = getAirtableConfig(countryCode);
  const airtableObj: IAirtable = new Airtable({
    apiKey: config.apiKey
  });
  return airtableObj.base(config.database);
};
