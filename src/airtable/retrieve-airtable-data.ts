import {
  airtable
} from './airtable';

import {
  initObjectFromAirtableRecords
} from './airtable-data-utils';

import {
  AirtableRequestOptions,
  AirtableBaseRecord,
  AirtableSelectQuery
} from '../interfaces';

export const retrieveAirtableData = <T extends AirtableBaseRecord>({
  tableName,
  fields,
  fieldsToIncludeInOutput,
  filterByFormula,
  sort
}: AirtableRequestOptions<T>): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    let allRecords: T[] = [];
    const airtableSelect: AirtableSelectQuery<T> = {
      fields
    };
    if (filterByFormula) {
      airtableSelect.filterByFormula = filterByFormula;
    }
    if (sort) {
      airtableSelect.sort = sort;
    }
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

export const retrieveSingleAirtableRow = <T extends AirtableBaseRecord>(
  options: AirtableRequestOptions<T>
): Promise<T> => {
  return retrieveAirtableData(options).then(([ firstRecord ]) => firstRecord);
};
