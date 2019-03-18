import {
  AIRTABLE_API_KEY
} from '../config';
import { IAirtable } from '../interfaces';
// tslint:disable-next-line
const Airtable = require('airtable');

const airtableObj: IAirtable = new Airtable({
  apiKey: AIRTABLE_API_KEY
});

export const airtable = airtableObj.base('appCYPaLSsUK9Tp3a');
