import {
  IAirtableBaseRecord
} from '@chrisb-dev/seasonal-shared';

export interface IAirtableRecord<T extends IAirtableBaseRecord>
extends IAirtableBaseRecord {
  get: (fieldName: keyof T) => T[keyof T];
}
