import {
  BaseSeason
} from './base-season.interface';

import {
  Food
} from './food.interface';

import {
  Recipe
} from './recipe.interface';

export interface HydratedSeason extends BaseSeason {
  food?: Food[];
  recipes?: Recipe[];
}

