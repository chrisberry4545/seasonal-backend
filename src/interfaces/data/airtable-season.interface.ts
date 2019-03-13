import {
  BaseSeason
} from './base-season.interface';

export interface AirtableSeason extends BaseSeason {
  food: string[];
  recipes: string[];
}
