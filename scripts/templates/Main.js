import { fetchData } from '../utils/fetch.js';
import { RecipeCard } from '../component/RecipeCard.js';
import { FiltersWrapper } from './FiltersWrapper.js';

export class Main {
  constructor() {}

  async createMain() {
    const $filtersWrapper = document.createElement('div');
    $filtersWrapper.classList.add('filters__wrapper');

    const $tagsWrapper = document.createElement('div');
    $tagsWrapper.classList.add('tags__wrapper');

    const $recipesWrapper = document.createElement('div');
    $recipesWrapper.classList.add('recipes__wrapper');

    try {
      const recipesData = await fetchData();

      const Filters = new FiltersWrapper($filtersWrapper, recipesData);
      Filters.createFiltersWrapper();

      recipesData.forEach((recipe) => {
        const Recipe = new RecipeCard(recipe);
        const recipeCardHtml = Recipe.createRecipeCard();
        $recipesWrapper.innerHTML += recipeCardHtml;
      });
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }

    return { $filtersWrapper, $tagsWrapper, $recipesWrapper };
  }
}
