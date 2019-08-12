import {
  IAirtableSort
} from '../airtable';

export interface IAirtableRequestOptions<T> {
  tableName: string;
  fields: Array<keyof T>;
  fieldsToIncludeInOutput?: Array<keyof T>;
  filterByFormula?: string;
  sort?: Array<IAirtableSort<T>>;
  countryCode?: string;
}
