const {
  AIRTABLE_SEASON_FIELDS,
  AIRTABLE_TABLES
} = require('../const');

const {
  getFoodWithIds
} = require('./food-data');

const {
  getRecipesWithIds
} = require('./recipe-data');

const {
  hydrateAirtableData,
  retrieveAirtableData
} = require('../airtable');

const getAllSeasonData = () => {
  return retrieveAirtableData({
    tableName: AIRTABLE_TABLES.SEASONS,
    fields: [
      AIRTABLE_SEASON_FIELDS.NAME,
      AIRTABLE_SEASON_FIELDS.FOOD,
      AIRTABLE_SEASON_FIELDS.RECIPES
    ],
    sort: [{
      field: AIRTABLE_SEASON_FIELDS.SORT_ORDER,
      direction: 'asc'
    }]
  });
};

const hydrateSeasonData = (seasonData) => {
  return hydrateAirtableData(
    seasonData,
    [{
      getIdFunction: getRecipesWithIds,
      propertyName: AIRTABLE_SEASON_FIELDS.RECIPES
    }, {
      getIdFunction: getFoodWithIds,
      propertyName: AIRTABLE_SEASON_FIELDS.FOOD
    }]
  );
};

module.exports = {
  getAllSeasonData,
  hydrateSeasonData
};
