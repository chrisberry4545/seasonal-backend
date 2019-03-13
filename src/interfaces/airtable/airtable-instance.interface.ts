import { AirtableSelectQuery } from './airtable-select-query.interface';

import {
  AirtableSelectResponse
} from './airtable-select-response.interface';
import { AirtableBaseRecord } from './airtable-base-record.interface';

export interface AirtableInstance {
  select: <T extends AirtableBaseRecord>(
    select: AirtableSelectQuery<T>
  ) => AirtableSelectResponse<T>;
}
