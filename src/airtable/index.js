const { airtable } = require('./airtable');
const dataUtils = require('./airtable-data-utils');
const filterByUtils = require('./airtable-filter-by-utils');
const {
  retrieveAirtableData
} = require('./retrieve-airtable-data');

module.exports = {
  ...dataUtils,
  ...filterByUtils,
  airtable,
  retrieveAirtableData
};
