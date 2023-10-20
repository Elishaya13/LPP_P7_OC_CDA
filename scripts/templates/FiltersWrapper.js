import { FilterButton } from '../component/FilterButton.js';
import { Display } from '../utils/Display.js';
import { filterRecipeData } from '../utils/dataFilters.js';

export class FiltersWrapper {
  constructor(domParent, recipesData, searchFilter) {
    this.$parent = domParent;
    this.recipesData = recipesData;
    this.searchFilter = searchFilter;
  }

  createFiltersWrapper() {
    const filteredData = filterRecipeData(this.recipesData);
    const numberOfRecipes = this.recipesData.length;

    const ingredientsButton = new FilterButton(
      'Ingrédients',
      filteredData.ingredients,
      this.recipesData,
      this.searchFilter
    );
    const appliancesButton = new FilterButton(
      'Appareils',
      filteredData.appliances,
      this.recipesData,
      this.searchFilter
    );
    const ustensilsButton = new FilterButton(
      'Ustensiles',
      filteredData.ustensils,
      this.recipesData,
      this.searchFilter
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
