import { AirtableRecord } from './airtable-record.interface';
import { AirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface AirtableSelectResponse<T extends AirtableBaseRecord> {
  eachPage: (
    success: (
      records: AirtableRecord<T>[],
      fetchNextPage: () => void
    ) => void,
    error: (
      error: string
    ) => void
  ) => void;
}
