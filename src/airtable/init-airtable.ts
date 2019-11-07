import { IAirtable } from '../interfaces';
import { AIRTABLE_API_KEY } from '../config';
import {
  AIRTABLE_BASE_DB
} from '../config';
// tslint:disable-next-line
const Airtable = require('airtable');

export const initAirtable = () => {
  const database = AIRTABLE_BASE_DB;
  const airtableObj: IAirtable = new Airtable({
    apiKey: AIRTABLE_API_KEY
  });
  return airtableObj.base(database);
};
