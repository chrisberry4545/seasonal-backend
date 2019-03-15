import {
  AirtableBaseRecord
} from '@chrisb-dev/seasonal-shared';

export interface AirtableRecord<T extends AirtableBaseRecord>
extends AirtableBaseRecord {
  get: (fieldName: keyof T) => T[keyof T];
}
