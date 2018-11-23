const initObjectFromAirtableRecords = (records, fields) => (
  records.map((record) => fields.reduce((obj, nextFieldName) => {
    obj[nextFieldName] = record.get(nextFieldName);
    return obj;
  }, {
    id: record.id
  }))
);

const retrieveAirtableIds = (data, propertyName) => (
  data.map((item) => item[propertyName])
    .filter(Boolean)
    .reduce((array, next) => [
      ...array,
      next
    ], [])
);

const populateExistingData = (dataToAddTo, dataToGetFrom, propertyName) => (
  dataToAddTo.map((item) => {
    const existingDataProperty = item[propertyName];
    return {
      ...item,
      [propertyName]: existingDataProperty && [
        ...dataToGetFrom.filter(({ id }) => existingDataProperty.includes(id))
      ]
    };
  })
);

const retrieveMatchingTableData = (
  dataToHydrate,
  propertyName,
  asyncFunctionToGetIds
) => {
  const idsToGet = retrieveAirtableIds(
    dataToHydrate, propertyName
  );
  return asyncFunctionToGetIds(idsToGet);
};

const hydrateAirtableData = (
  dataToHydrate,
  propertyNamesAndGetIdFunctions
) => {
  const isArray = Array.isArray(dataToHydrate);
  const dataAsArray = isArray
    ? dataToHydrate
    : [dataToHydrate];
  return Promise.all(
    propertyNamesAndGetIdFunctions.map(({
      propertyName,
      getIdFunction
    }) => retrieveMatchingTableData(
      dataAsArray,
      propertyName,
      getIdFunction
    ))
  ).then((matchingTableData) => {
    const hydratedArrayResult = propertyNamesAndGetIdFunctions
      .reduce((hydratedData, { propertyName }, index) => {
        return populateExistingData(
          hydratedData,
          matchingTableData[index],
          propertyName
        );
      }, dataAsArray);
    return isArray
      ? hydratedArrayResult
      : hydratedArrayResult[0];
  });
};

module.exports = {
  retrieveMatchingTableData,
  hydrateAirtableData,
  initObjectFromAirtableRecords,
  populateExistingData,
  retrieveAirtableIds
};
