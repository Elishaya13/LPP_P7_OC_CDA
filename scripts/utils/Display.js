import { RecipeCard } from '../component/RecipeCard.js';
import { FiltersWrapper } from '../templates/FiltersWrapper.js';
import { recipesFiltered } from './SearchFilter.js';

export class Display {
  constructor(searchFilter) {
    this.searchFilter = searchFilter;
  }

  displayRecipes(domElement, recipesList) {
    console.log('construit la vue des recettes');
    console.log('recipes filtered recup dans display', recipesFiltered);
    domElement = domElement ?? document.querySelector('.recipes__wrapper');

    domElement.innerHTML = '';

    for (let recipe of recipesList) {
      const card = new RecipeCard(recipe).createRecipeCard();

      domElement.innerHTML += card;
    }
    return domElement;
  }

  displayCounter(recipesFiltered) {
    //recupere l'element du Dom
    const $counter = document.querySelector('.filter__counter__span');

    // 's' or not
    recipesFiltered.length > 1
      ? ($counter.textContent = `${recipesFiltered.length} recettes `)
      : ($counter.textContent = `${recipesFiltered.length} recette `);

    console.log('met a jour le compteur de recette');
  }

  displayMenuFilter(domElement, recipesList, search) {
    domElement.innerHTML = '';

    const filters = new FiltersWrapper(domElement, recipesList, search);

    filters.createFiltersWrapper();

    console.log('met a jour le contenu des menu');
  }
}
