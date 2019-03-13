import { AirtableInstance } from './airtable-instance.interface';

export interface Airtable {
  base(
    key: string
  ): (tableName: string) => AirtableInstance;
}
