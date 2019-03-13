import { AirtableRecord } from './airtable-record.interface';
import { AirtableBaseRecord } from './airtable-base-record.interface';

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
