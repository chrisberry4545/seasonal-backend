export const filterByIds = (ids: string[] | string): string => {
  const idsAsArray = Array.isArray(ids)
    ? ids
    : [ids];
  return `OR(${idsAsArray.map((id) => `RECORD_ID() = '${id}'`)})`;
};

export const filterByField = <T>(
  fieldName: keyof T,
  fieldValue: string | number
): string => (
  `${fieldName} = ${fieldValue}`
);
