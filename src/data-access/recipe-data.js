const {
  AIRTABLE_RECIPE_FIELDS,
  AIRTABLE_TABLES
} = require('../const');

const {
  filterByIds,
  retrieveAirtableData
} = require('../airtable');

const getRecipesWithIds = (ids) => {
  return retrieveAirtableData({
    tableName: AIRTABLE_TABLES.RECIPES,
    fields: [
      AIRTABLE_RECIPE_FIELDS.NAME,
      AIRTABLE_RECIPE_FIELDS.LINK_URL
    ],
    filterByFormula: filterByIds(ids)
  });
};
module.exports = {
  getRecipesWithIds
};
