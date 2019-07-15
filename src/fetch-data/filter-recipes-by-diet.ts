import { IRecipe } from '@chrisb-dev/seasonal-shared';

export const filterRecipesByDiet = (
  recipes: IRecipe[] | undefined,
  isVegetarian?: boolean,
  isVegan?: boolean
) => (
  recipes && recipes.filter((recipe) => {
    return isVegan ? recipe.isVegan
      : isVegetarian ? recipe.isVegetarian || recipe.isVegan
        : true;
  })
);
