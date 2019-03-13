import {
  AirtableBaseRecord
} from '../airtable';

export interface Food extends AirtableBaseRecord {
  name: string;
  imageUrlSmall: string;
}
