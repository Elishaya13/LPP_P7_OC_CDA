import { displayMenuFilter, displayRecipes } from '../utils/display.js';

export class Main {
  constructor(recipesData, searchFilter) {
    this.recipesData = recipesData;
    this.searchFilter = searchFilter;
  }

  async createMain() {
    const $filtersWrapper = document.createElement('div');
    $filtersWrapper.classList.add('filters__wrapper');

    const $tagsWrapper = document.createElement('div');
    $tagsWrapper.classList.add('tags__wrapper');

    const $recipesWrapper = document.createElement('div');
    $recipesWrapper.classList.add('recipes__wrapper');

    displayMenuFilter($filtersWrapper, this.recipesData, this.searchFilter);

    displayRecipes($recipesWrapper, this.recipesData);

    return { $filtersWrapper, $tagsWrapper, $recipesWrapper };
  }
}
