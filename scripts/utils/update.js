import { SearchFilter } from './SearchFilter.js';
import {
  displayCounter,
  displayFilters,
  displayNoResult,
  displayRecipes,
  removeNoResultMessage,
} from './display.js';
import { fetchData } from './fetch.js';

const dataRecipes = await fetchData();
let recipesFilteredBySearch = [];

/**
 * Update the view by displaying recipes, filters, and a counter based on the filtered data.
 */
export function updateView() {
  let recipesFiltered = recipesFilteredBySearch;
  const $recipesWrapper = document.querySelector('.recipes__wrapper');
  const $filtersWrapper = document.querySelector('.filters__wrapper');

  // Display recipes, filters, and a counter based on filtered data
  displayRecipes($recipesWrapper, recipesFiltered);
  displayFilters($filtersWrapper, recipesFiltered);
  displayCounter(recipesFiltered);
}

/**
 * Update the search by applying search terms and tags to filter the data.
 *
 * @param {string} inputValue - The search term entered by the user.
 * @param {Array} tags - An array of tags to filter the data.
 */
export function updateSearch(inputValue, tags) {
  removeNoResultMessage();
  const searchFilter = new SearchFilter(dataRecipes);

  // Apply search terms and tags to filter the data
  searchFilter.search(inputValue, tags);
  recipesFilteredBySearch = searchFilter.search(inputValue, tags);

  let recipesWithTerms = searchFilter.filterWithTerms(
    recipesFilteredBySearch,
    inputValue
  );
  if (recipesWithTerms.length === 0 || recipesFilteredBySearch.length === 0) {
    displayNoResult(inputValue);
  }
}
