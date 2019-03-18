import { IAirtableSort } from './airtable-sort.interface';

export interface IAirtableSelectQuery<T> {
  fields: Array<keyof T>;
  filterByFormula?: string;
  sort?: Array<IAirtableSort<T>>;
}
