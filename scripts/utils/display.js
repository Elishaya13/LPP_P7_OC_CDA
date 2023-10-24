import { RecipeCard } from '../component/RecipeCard.js';
import { FiltersWrapper } from '../templates/FiltersWrapper.js';

export function displayRecipes(domElement, recipesList) {
  domElement = domElement ?? document.querySelector('.recipes__wrapper');

  domElement.innerHTML = '';

  for (let recipe of recipesList) {
    const card = new RecipeCard(recipe).createRecipeCard();

    domElement.innerHTML += card;
  }
  return domElement;
}

export function displayCounter(recipesFiltered) {
  const $counter = document.querySelector('.filter__counter__span');

  // 's' or not
  recipesFiltered.length > 1
    ? ($counter.textContent = `${recipesFiltered.length} recettes `)
    : ($counter.textContent = `${recipesFiltered.length} recette `);
}

export function displayMenuFilter(domElement, recipesList, search) {
  domElement.innerHTML = '';

  const filters = new FiltersWrapper(domElement, recipesList, search);

  filters.createFiltersWrapper();
}