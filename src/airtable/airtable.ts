import {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_DB
} from '../config';
import { IAirtable } from '../interfaces';
// tslint:disable-next-line
const Airtable = require('airtable');

const airtableObj: IAirtable = new Airtable({
  apiKey: AIRTABLE_API_KEY
});

export const airtable = airtableObj.base(AIRTABLE_BASE_DB);
