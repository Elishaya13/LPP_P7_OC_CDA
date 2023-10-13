import { RecipeCard } from '../component/RecipeCard.js';
import { FiltersWrapper } from '../templates/FiltersWrapper.js';

export class Search {
  constructor(recipesData) {
    this.recipesData = recipesData;
    this.$recipesWrapper = document.querySelector('.recipes__wrapper');
    this.$filterWrapper = document.querySelector('.filters__wrapper');
    this.recipesFilter = [];
  }

  removeDomElement(domElement) {
    domElement.innerHTML = '';
  }

  removeTagFilter(searchTag) {}

  // Display the found recipes
  displayRecipes(foundRecipes, searchTerm) {
    this.removeDomElement(this.$recipesWrapper);

    for (let recipe of foundRecipes) {
      const card = new RecipeCard(recipe);
      const cardHTML = card.createRecipeCard();
      this.$recipesWrapper.innerHTML += cardHTML;
    }

    if (foundRecipes.length === 0) {
      const $noResult = `<div class="no-result"> <p>Aucune recette ne contient <b> "${searchTerm}" </b>, vous  pouvez chercher "tarte aux pommes", "poisson", etc.</p> </div>`;
      this.$recipesWrapper.innerHTML = $noResult;
    }

    return this.$recipesWrapper;
  }

  updateFilters(foundRecipes) {
    this.removeDomElement(this.$filterWrapper);
    const filters = new FiltersWrapper(this.$filterWrapper, foundRecipes);
    filters.createFiltersWrapper();
  }
  updateCounter(foundRecipes) {
    const $counter = document.querySelector('.filter__counter__span');
    foundRecipes.length > 1
      ? ($counter.textContent = `${foundRecipes.length} recettes `)
      : ($counter.textContent = `${foundRecipes.length} recette `);
  }

  getRecipeWithTerm(recipes, searchTerm) {
    // Initialize an empty array to store matching recipes.
    let recipesFound = [];
    for (let recipe of recipes) {
      // Convert the recipe's name and description to lowercase for case-insensitive matching.
      const nameLowerCase = recipe.name.toLowerCase();
      const descriptionLowerCase = recipe.description.toLowerCase();

      // Check if the name or description contains the 'searchTerm'.
      if (
        nameLowerCase.includes(searchTerm) ||
        descriptionLowerCase.includes(searchTerm)
      ) {
        recipesFound.push(recipe);
      } else {
        // If no match is found in name or description, loop through each ingredient in the recipe.
        for (let ingredient of recipe.ingredients) {
          const ingredientLowerCase = ingredient.ingredient.toLowerCase();
          if (ingredientLowerCase.includes(searchTerm)) {
            // If a matching ingredient is found, add the recipe to 'recipesFound'.
            // Then, break the loop to prevent duplicate additions for the same recipe.
            recipesFound.push(recipe);
            break;
          }
        }
      }
    }
    return recipesFound;
  }
  getRecipeWithTag(recipes, searchTag) {
    let recipesFound = [];
    for (let recipe of recipes) {
      for (let ingredient of recipe.ingredients) {
        const item = ingredient.ingredient;
        if (item.includes(searchTag)) {
          recipesFound.push(recipe);
        }
      }

      for (let ustensil of recipe.ustensils) {
        const searchTagToLowerCase = searchTag.toLowerCase();
        if (ustensil.includes(searchTagToLowerCase)) {
          recipesFound.push(recipe);
        }
      }
      if (recipe.appliance.includes(searchTag)) {
        recipesFound.push(recipe);
      }
    }

    return recipesFound;
  }
  addInArray(recipesFound) {
    for (let recipe of recipesFound) {
      if (!this.recipesFilter.includes(recipe)) {
        this.recipesFilter.push(recipe);
      }
    }
  }

  searchRecipe(searchTerm) {
    const recipesList = this.recipesData;
    const recipesFound = this.getRecipeWithTerm(recipesList, searchTerm);
    this.recipesFilter = [];
    this.addInArray(recipesFound);

    this.displayRecipes(recipesFound, searchTerm);
    this.updateCounter(recipesFound);
    this.updateFilters(recipesFound);

    console.log(this.recipesFilter);
  }

  searchRecipeWithTag(searchTag) {
    const recipesList = this.recipesData;
    const recipesFound = this.getRecipeWithTag(recipesList, searchTag);
    this.addInArray(recipesFound);

    this.displayRecipes(this.recipesFilter, searchTag);
    this.updateCounter(this.recipesFilter);
    this.updateFilters(this.recipesFilter);

    //this.removeTagFilter(searchTag);

    console.log(this.recipesFilter);
  }
}
