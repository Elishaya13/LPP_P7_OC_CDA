import { FilterButton } from '../component/FilterButton.js';
import { filterRecipeData } from '../utils/dataFilters.js';

export class FiltersWrapper {
  constructor(parent, data) {
    this.$parent = parent;
    this.data = data;
  }

  createFiltersWrapper() {
    const filteredData = filterRecipeData(this.data);
    const numberOfRecipes = this.data.length;

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
