import { IAirtable } from '../interfaces';
import { getAirtableDatabase } from './get-airtable-database';
import { AIRTABLE_API_KEY } from '../config';
// tslint:disable-next-line
const Airtable = require('airtable');

export const initAirtable = (countryCode?: string) => {
  const database = getAirtableDatabase(countryCode);
  const airtableObj: IAirtable = new Airtable({
    apiKey: AIRTABLE_API_KEY
  });
  return airtableObj.base(database);
};
