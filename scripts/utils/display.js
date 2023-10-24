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

  const countText =
    recipesFiltered.length >= 10
      ? `${recipesFiltered.length}`
      : `0${recipesFiltered.length}`;

  const recipeText = recipesFiltered.length > 1 ? 'recettes' : 'recette';
  $counter.textContent = `${countText} ${recipeText}`;
}

export function displayMenuFilter(domElement, recipesList, search) {
  domElement.innerHTML = '';

  const filters = new FiltersWrapper(domElement, recipesList, search);

  filters.createFiltersWrapper();
}

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
