import { RecipeCard } from '../component/RecipeCard.js';
import { FiltersWrapper } from '../templates/FiltersWrapper.js';

/**
 * Display recipes in a specified DOM element.
 *
 * @param {Element} domElement - The DOM element where the recipes will be displayed.
 * @param {Array} recipesList - The list of recipes to display.
 * @returns {Element} - The DOM element containing the displayed recipes.
 */
export function displayRecipes(domElement, recipesList) {
  domElement = domElement ?? document.querySelector('.recipes__wrapper');

  domElement.innerHTML = '';

  for (let recipe of recipesList) {
    const card = new RecipeCard(recipe).createRecipeCard();

    domElement.innerHTML += card;
  }
  return domElement;
}

/**
 * Display a counter indicating the number of filtered recipes.
 *
 * @param {Array} recipesFiltered - The list of filtered recipes.
 */
export function displayCounter(recipesFiltered) {
  const $counter = document.querySelector('.filter__counter__span');

  const countText =
    recipesFiltered.length >= 10
      ? `${recipesFiltered.length}`
      : `0${recipesFiltered.length}`;

  const recipeText = recipesFiltered.length > 1 ? 'recettes' : 'recette';
  $counter.textContent = `${countText} ${recipeText}`;
}

/**
 * Display menu filters in a specified DOM element.
 *
 * @param {Element} domElement - The DOM element where the menu filters will be displayed.
 * @param {Array} recipesList - The list of all recipes.
 */
export function displayFilters(domElement, recipesList) {
  domElement.innerHTML = '';

  const filters = new FiltersWrapper(domElement, recipesList);

  filters.createFiltersWrapper();
}

/**
 * Display a message indicating no search results were found.
 *
 * @param {string} searchTerm - The search term that resulted in no matches.
 */
export function displayNoResult(searchTerm) {
  const parentElt = document.querySelector('.header__searchbar');
  const noResultsDiv = document.createElement('div');
  noResultsDiv.classList.add('no-result');
  const textNoResult = document.createElement('p');
  textNoResult.innerText = `« Aucune recette ne contient ‘${searchTerm}’ vous pouvez chercher «
  tarte aux pommes », « poisson », etc.`;
  noResultsDiv.appendChild(textNoResult);
  parentElt.appendChild(noResultsDiv);
}

/**
 * Removes the "No result" message from the search bar.
 */
export function removeNoResultMessage() {
  const parentElt = document.querySelector('.header__searchbar');
  const noResultsDiv = parentElt.querySelector('.no-result');
  if (noResultsDiv) {
    parentElt.removeChild(noResultsDiv);
  }
}
