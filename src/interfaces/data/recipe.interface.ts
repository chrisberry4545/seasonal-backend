import {
  AirtableBaseRecord
} from '../airtable';

export interface Recipe extends AirtableBaseRecord {
  name: string;
  linkUrl: string;
  imageUrlSmall: string;
}
