import { AirtableSort } from "./airtable-sort.interface";

export interface AirtableSelectQuery<T> {
  fields: Array<keyof T>;
  filterByFormula?: string;
  sort?: AirtableSort<T>[];
}
