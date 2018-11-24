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
      AIRTABLE_RECIPE_FIELDS.LINK_URL,
      AIRTABLE_RECIPE_FIELDS.IMAGE_URL_SMALL
    ],
    filterByFormula: filterByIds(ids)
  });
};
module.exports = {
  getRecipesWithIds
};
