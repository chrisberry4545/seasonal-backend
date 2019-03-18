import { IAirtableSelectQuery } from './airtable-select-query.interface';

import {
  IAirtableSelectResponse
} from './airtable-select-response.interface';
import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IAirtableInstance {
  select: <T extends IAirtableBaseRecord>(
    select: IAirtableSelectQuery<T>
  ) => IAirtableSelectResponse<T>;
}
