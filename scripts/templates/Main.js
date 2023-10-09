import { fetchData } from '../utils/fetch.js';
import { RecipeCard } from '../component/RecipeCard.js';

export class Main {
  constructor() {}

  async createMain() {
    const $filterWrapper = document.createElement('div');
    $filterWrapper.classList.add('filter__wrapper');

    const $recipesWrapper = document.createElement('div');
    $recipesWrapper.classList.add('recipes__wrapper');

    try {
      const recipesData = await fetchData();

      recipesData.forEach((recipe) => {
        const Recipe = new RecipeCard(recipe);
        const recipeCardHtml = Recipe.createRecipeCard();
        $recipesWrapper.innerHTML += recipeCardHtml;
      });
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }

    return { $filterWrapper, $recipesWrapper };
  }
}
