import { IAirtableInstance } from './airtable-instance.interface';

export interface IAirtable {
  base(
    key: string
  ): (tableName: string) => IAirtableInstance;
}
