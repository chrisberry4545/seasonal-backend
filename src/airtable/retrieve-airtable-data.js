const {
  airtable
} = require('./airtable');

const {
  initObjectFromAirtableRecords
} = require('./airtable-data-utils');

const retrieveAirtableData = ({
  tableName,
  fields,
  fieldsToIncludeInOutput,
  filterByFormula,
  sort
}) => {
  return new Promise((resolve, reject) => {
    let allRecords = [];
    const airtableSelect = {
      fields
    };
    if (filterByFormula) {
      airtableSelect.filterByFormula = filterByFormula;
    }
    if (sort) {
      airtableSelect.sort = sort;
    }
    airtable(tableName).select(airtableSelect)
      .eachPage((records, fetchNextPage) => {
        allRecords = [
          ...allRecords,
          ...initObjectFromAirtableRecords(
            records,
            fieldsToIncludeInOutput || fields
          )
        ];
        fetchNextPage();
        resolve(records);
      }, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(allRecords);
      });
  });
};
module.exports = {
  retrieveAirtableData
};
