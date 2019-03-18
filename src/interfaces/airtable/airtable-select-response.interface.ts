import { IAirtableRecord } from './airtable-record.interface';
import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IAirtableSelectResponse<T extends IAirtableBaseRecord> {
  eachPage: (
    success: (
      records: Array<IAirtableRecord<T>>,
      fetchNextPage: () => void
    ) => void,
    error: (
      error: string
    ) => void
  ) => void;
}
