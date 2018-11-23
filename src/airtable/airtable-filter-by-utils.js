const filterByIds = (ids) => {
  const idsAsArray = Array.isArray(ids)
    ? ids
    : [ids];
  return `OR(${idsAsArray.map((id) => `RECORD_ID() = '${id}'`)})`;
};

const filterByField = (fieldName, fieldValue) => (
  `LOWER(${fieldName}) = LOWER("${fieldValue}")`
);

module.exports = {
  filterByField,
  filterByIds
};
