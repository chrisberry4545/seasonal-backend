import {
  IAirtableRecord
} from '../interfaces';

import {
  IAirtableBaseRecord
} from '@chrisb-dev/seasonal-shared';

export const initObjectFromAirtableRecords = <
  MainType extends IAirtableBaseRecord
>(
  records: Array<IAirtableRecord<MainType>>,
  fields: Array<keyof MainType>
): MainType[] => (
  records.map((record) => fields.reduce((obj, nextFieldName) => {
    obj[nextFieldName] = record.get(nextFieldName);
    return obj;
  }, {
    id: record.id
  } as MainType))
);

export const retrieveAirtableIds = <
  MainType extends IAirtableBaseRecord
>(
  data: MainType[],
  propertyName: keyof MainType
): string[] => (
  data.map((item) => item[propertyName])
    .filter(Boolean)
    .reduce((array, next) => [
      ...array,
      ...(Array.isArray(next) ? next : [])
    ], [] as string[])
);

export const populateExistingData = <
  MainType extends IAirtableBaseRecord,
  SubType extends IAirtableBaseRecord
>(
  dataToAddTo: MainType[],
  dataToGetFrom: SubType[],
  propertyName: keyof MainType
) => (
  dataToAddTo.map((item) => {
    const existingDataProperty = item[propertyName];
    return {
      ...item,
      [propertyName]: existingDataProperty &&
        Array.isArray(existingDataProperty) &&
        [
          ...dataToGetFrom.filter(({ id }) => existingDataProperty.includes(id))
        ]
    } as any;
  })
);

export const retrieveMatchingTableData = <
  MainType extends IAirtableBaseRecord,
  SubType extends IAirtableBaseRecord
>(
  dataToHydrate: MainType[],
  propertyName: keyof MainType,
  asyncFunctionToGetIds: (ids: string[] | string) => Promise<SubType[]>
) => {
  const idsToGet = retrieveAirtableIds(
    dataToHydrate, propertyName
  );
  return asyncFunctionToGetIds(idsToGet);
};

export const hydrateAirtableData = <
  MainType extends IAirtableBaseRecord,
  SubTypeKey extends keyof MainType,
  SubType extends IAirtableBaseRecord
>(
  dataToHydrate: MainType,
  propertyNamesAndGetIdFunctions: Array<{
    propertyName: SubTypeKey,
    getIdFunction(ids: string[] | string): Promise<SubType[]>
  }>
): Promise<IAirtableBaseRecord | IAirtableBaseRecord[]> => {
  const dataAsArray: MainType[] = Array.isArray(dataToHydrate)
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
      }, dataAsArray) as any;
    return Array.isArray(dataToHydrate)
      ? hydratedArrayResult
      : hydratedArrayResult[0];
  });
};
