export interface IAirtableSort<T> {
  field: keyof T;
  direction: 'asc' | 'desc';
}
