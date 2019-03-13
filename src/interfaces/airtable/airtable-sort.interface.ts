export interface AirtableSort<T> {
  field: keyof T;
  direction: 'asc' | 'desc';
}
