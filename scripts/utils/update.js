import { SearchFilter, recipesFiltered } from './SearchFilter.js';
import {
  displayCounter,
  displayMenuFilter,
  displayRecipes,
} from './display.js';
import { fetchData } from './fetch.js';

const dataRecipes = await fetchData();

/**
 * Updates the view with filtered recipes and display information.
 * @param {SearchFilter} search - The search filter instance.
 */
export function updateView() {
  const $recipesWrapper = document.querySelector('.recipes__wrapper');
  const $filtersWrapper = document.querySelector('.filters__wrapper');

  displayRecipes($recipesWrapper, recipesFiltered);
  displayMenuFilter($filtersWrapper, recipesFiltered);
  displayCounter(recipesFiltered);
  // const display = new Display();
  // display.displayRecipes($recipesWrapper, recipesFiltered);
  // display.displayMenuFilter($filtersWrapper, recipesFiltered);
  // display.displayCounter(recipesFiltered);
}

/**
 * Updates the search results based on user input and selected tags.
 * @param {Array} data - The data source for searching.
 * @param {string} inputValue - The user input for searching.
 * @param {Array} tags - An array of selected tags.
 */
export function updateSearch(inputValue, tags) {
  const searchFilter = new SearchFilter(dataRecipes);
  searchFilter.search(inputValue, tags);
}
