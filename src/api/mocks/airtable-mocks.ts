import {
  Airtable,
  AirtableInstance,
  AirtableSelectQuery
} from '../../interfaces';
import {
  AirtableBaseRecord
} from '@chrisb-dev/seasonal-shared';
import { AIRTABLE_TABLES } from '../../const';

import mockFoodTableData from './data/food-table.data.json';
import mockRecipeTableData from './data/recipe-table.data.json';
import mockSeasonData from './data/season-table.data.json';

const convertToRecord = <T extends AirtableBaseRecord>(item: T) => {
  return {
    id: item.id,
    get: jest.fn().mockImplementation((propertyName: keyof T) => {
      return item[propertyName];
    })
  }
};

const initAirtableObject = <T extends AirtableBaseRecord>(
  airtableData: T[]
) => {
  return {
    select: jest.fn().mockImplementation((
      select: AirtableSelectQuery<AirtableBaseRecord>
    ) => {
      const isSelectEquals = /(.*)\s=\s(.*)/;
      const selectEqualsResult =
        isSelectEquals.exec(select.filterByFormula || '');
      const dataToUse = selectEqualsResult && selectEqualsResult.length > 2
        ? airtableData.filter((data) => {
          const matchingField = (data as any)[selectEqualsResult[1]];
          return matchingField === undefined ||
            matchingField.toString() === selectEqualsResult[2]
        })
        : airtableData;
      const selectReturnValue = {
        eachPage:
          jest.fn().mockImplementation((perPageCallback, onCompleteCallback) => {
            const convertedData = dataToUse.map(convertToRecord);
            perPageCallback(convertedData, () => {});
            onCompleteCallback();
          })
      };
      return selectReturnValue;
    })
  };
};

const getDataForTableName = (tableName: string) => {
  switch(tableName) {
    case AIRTABLE_TABLES.FOOD:
      return mockFoodTableData;
    case AIRTABLE_TABLES.RECIPES:
      return mockRecipeTableData;
  }
  return mockSeasonData;
};

export const initMockAirtableBaseResult = () => (
  tableName: string
): AirtableInstance => (
  initAirtableObject<AirtableBaseRecord>(getDataForTableName(tableName))
);

const mockAirtable: Airtable = {
  base: jest.fn().mockReturnValue(initMockAirtableBaseResult())
}

export const airtableMockSetup = () => {
  jest.mock('airtable', () => {
    return function() {
      return mockAirtable;
    }
  });
};
