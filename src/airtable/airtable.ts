import {
  AIRTABLE_API_KEY
} from '../config';
import { Airtable } from '../interfaces';
const Airtable = require('airtable');

const airtableObj: Airtable = new Airtable({
  apiKey: AIRTABLE_API_KEY
});

export const airtable = airtableObj.base('appCYPaLSsUK9Tp3a');
