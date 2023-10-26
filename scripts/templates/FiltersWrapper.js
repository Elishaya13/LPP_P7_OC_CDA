import { FilterButton } from '../component/FilterButton.js';
import { filterRecipeData } from '../utils/dataFilters.js';

/**
 * A class representing a container for filtering buttons and a recipe counter.
 */
export class FiltersWrapper {
  /**
   * Create a new FiltersWrapper.
   *
   * @param {Element} domParent - The DOM element where the filters will be created.
   * @param {Array} recipesData - The list of recipes data used for filtering.
   */
  constructor(domParent, recipesData) {
    this.$parent = domParent;
    this.recipesData = recipesData;
  }

  /**
   * Create the filter buttons and recipe counter within the FiltersWrapper.
   */
  createFiltersWrapper() {
    const filteredData = filterRecipeData(this.recipesData);
    const numberOfRecipes = this.recipesData.length;

    const ingredientsButton = new FilterButton(
      'Ingrédients',
      filteredData.ingredients
    );
    const appliancesButton = new FilterButton(
      'Appareils',
      filteredData.appliances
    );
    const ustensilsButton = new FilterButton(
      'Ustensiles',
      filteredData.ustensils
    );

    const $ingredientsFilter = ingredientsButton.createFilterButton();
    const $appliancesFilter = appliancesButton.createFilterButton();
    const $ustensilsFilter = ustensilsButton.createFilterButton();

    const $recipeCounter = document.createElement('div');
    $recipeCounter.classList.add('filter__counter');
    const $span = document.createElement('span');
    $span.classList.add('filter__counter__span');

    if (numberOfRecipes === 1 || numberOfRecipes === 0) {
      $span.textContent = numberOfRecipes + ' recette';
    } else {
      $span.textContent = numberOfRecipes + ' recettes';
    }

    $recipeCounter.appendChild($span);

    this.$parent.appendChild($ingredientsFilter);
    this.$parent.appendChild($appliancesFilter);
    this.$parent.appendChild($ustensilsFilter);
    this.$parent.appendChild($recipeCounter);
  }
}
