import {
  AirtableBaseRecord
} from '../airtable';

export interface BaseSeason extends AirtableBaseRecord {
  name: string;
  seasonIndex: number;
}
