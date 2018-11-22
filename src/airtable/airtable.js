const {
  AIRTABLE_API_KEY
} = require('./../config');
const Airtable = require('airtable');
const airtable = new Airtable({
  apiKey: AIRTABLE_API_KEY
}).base('appCYPaLSsUK9Tp3a');

module.exports = {
  airtable
};
