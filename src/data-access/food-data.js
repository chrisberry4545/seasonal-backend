const {
  AIRTABLE_FOOD_FIELDS,
  AIRTABLE_TABLES
} = require('../const');

const {
  filterByIds,
  retrieveAirtableData
} = require('../airtable');

const getFoodWithIds = (ids) => {
  return retrieveAirtableData({
    tableName: AIRTABLE_TABLES.FOOD,
    fields: [
      AIRTABLE_FOOD_FIELDS.NAME,
      AIRTABLE_FOOD_FIELDS.IMAGE_URL_SMALL
    ],
    filterByFormula: filterByIds(ids)
  });
};
module.exports = {
  getFoodWithIds
};
