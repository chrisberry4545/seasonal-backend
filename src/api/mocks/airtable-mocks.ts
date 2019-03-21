import {
  IAirtable,
  IAirtableInstance,
  IAirtableSelectQuery
} from '../../interfaces';
import {
  IAirtableBaseRecord
} from '@chrisb-dev/seasonal-shared';
import { AIRTABLE_TABLES } from '../../const';

import mockFoodTableData from './data/food-table.data.json';
import mockRecipeTableData from './data/recipe-table.data.json';
import mockSeasonData from './data/season-table.data.json';

const convertToRecord = <T extends IAirtableBaseRecord>(item: T) => {
  return {
    get: jest.fn().mockImplementation((propertyName: keyof T) => {
      return item[propertyName];
    }),
    id: item.id
  };
};

const initAirtableObject = <T extends IAirtableBaseRecord>(
  airtableData: T[]
) => {
  return {
    select: jest.fn().mockImplementation((
      select: IAirtableSelectQuery<IAirtableBaseRecord>
    ) => {
      const isSelectEquals = /(.*)\s=\s(.*)/;
      const selectEqualsResult =
        isSelectEquals.exec(select.filterByFormula || '');
      const dataToUse = selectEqualsResult && selectEqualsResult.length > 2
        ? airtableData.filter((data) => {
          const matchingField = (data as any)[selectEqualsResult[1]];
          return matchingField === undefined ||
            matchingField.toString() === selectEqualsResult[2];
        })
        : airtableData;
      const selectReturnValue = {
        eachPage:
          jest.fn().mockImplementation((perPageCallback, onCompleteCallback) => {
            const convertedData = dataToUse.map(convertToRecord);
            perPageCallback(convertedData, () => undefined);
            onCompleteCallback();
          })
      };
      return selectReturnValue;
    })
  };
};

const getDataForTableName = (tableName: string) => {
  switch (tableName) {
    case AIRTABLE_TABLES.FOOD:
      return mockFoodTableData;
    case AIRTABLE_TABLES.RECIPES:
      return mockRecipeTableData;
  }
  return mockSeasonData;
};

export const initMockAirtableBaseResult = () => (
  tableName: string
): IAirtableInstance => (
  initAirtableObject<IAirtableBaseRecord>(getDataForTableName(tableName))
);

const mockAirtable: IAirtable = {
  base: jest.fn().mockReturnValue(initMockAirtableBaseResult())
};

export const airtableMockSetup = () => {
  jest.mock('airtable', () => {
    return jest.fn().mockImplementation(() => {
      return mockAirtable;
    });
  });
};
