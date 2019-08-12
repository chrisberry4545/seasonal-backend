import {
  initAirtable
} from './init-airtable';

import {
  initObjectFromAirtableRecords
} from './airtable-data-utils';

import {
  IAirtableRequestOptions,
  IAirtableSelectQuery
} from '../interfaces';

import {
  IAirtableBaseRecord
} from '@chrisb-dev/seasonal-shared';

export const retrieveAirtableData = <T extends IAirtableBaseRecord>({
  tableName,
  fields,
  fieldsToIncludeInOutput,
  filterByFormula,
  sort,
  countryCode
}: IAirtableRequestOptions<T>): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    let allRecords: T[] = [];
    const airtableSelect: IAirtableSelectQuery<T> = {
      fields
    };
    if (filterByFormula) {
      airtableSelect.filterByFormula = filterByFormula;
    }
    if (sort) {
      airtableSelect.sort = sort;
    }
    const airtable = initAirtable(countryCode);
    airtable(tableName).select(airtableSelect)
      .eachPage((records, fetchNextPage) => {
        allRecords = [
          ...allRecords,
          ...initObjectFromAirtableRecords(
            records,
            fieldsToIncludeInOutput || fields
          )
        ];
        fetchNextPage();
      }, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(allRecords);
      });
  });
};

export const retrieveSingleAirtableRow = <T extends IAirtableBaseRecord>(
  options: IAirtableRequestOptions<T>
): Promise<T> => {
  return retrieveAirtableData(options).then(([ firstRecord ]) => firstRecord);
};
