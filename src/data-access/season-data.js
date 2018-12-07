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
  filterByField,
  hydrateAirtableData,
  retrieveAirtableData,
  retrieveSingleAirtableRow
} = require('../airtable');

const getAllSeasonData = () => {
  return retrieveAirtableData({
    tableName: AIRTABLE_TABLES.SEASONS,
    fields: [
      AIRTABLE_SEASON_FIELDS.NAME
    ],
    sort: [{
      field: AIRTABLE_SEASON_FIELDS.SEASON_INDEX,
      direction: 'asc'
    }]
  });
};

const getSeasonDataBySeasonIndex = (seasonIndex) => {
  return retrieveSingleAirtableRow({
    tableName: AIRTABLE_TABLES.SEASONS,
    fields: [
      AIRTABLE_SEASON_FIELDS.NAME,
      AIRTABLE_SEASON_FIELDS.FOOD,
      AIRTABLE_SEASON_FIELDS.RECIPES
    ],
    filterByFormula:
      filterByField(AIRTABLE_SEASON_FIELDS.SEASON_INDEX, seasonIndex)
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

const sortByName = (a, b) => a.name > b.name ? 1 : -1;

const sortSeasonData = (seasonData) => ({
  ...seasonData,
  food: seasonData.food.sort(sortByName)
});

module.exports = {
  getAllSeasonData,
  getSeasonDataBySeasonIndex,
  hydrateSeasonData,
  sortSeasonData
};
