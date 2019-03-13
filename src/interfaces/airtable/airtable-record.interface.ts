import {
  AirtableBaseRecord
} from './airtable-base-record.interface';

export interface AirtableRecord<T extends AirtableBaseRecord>
extends AirtableBaseRecord {
  get: (fieldName: keyof T) => T[keyof T];
}
