import { RecipeCard } from '../component/RecipeCard.js';

export class Search {
  constructor(recipesData) {
    this.recipesData = recipesData;
    this.$recipesWrapper = document.querySelector('.recipes__wrapper');
    this.$filterWrapper = document.querySelector('.filter__wrapper');
  }

  removeRecipes(domElement) {
    domElement.innerHTML = '';
  }

  // Display the found recipes
  displayRecipes(foundRecipes) {
    this.removeRecipes(this.$recipesWrapper);

    for (let recipe of foundRecipes) {
      const card = new RecipeCard(recipe);
      const cardHTML = card.createRecipeCard();
      this.$recipesWrapper.innerHTML += cardHTML;
    }
    return this.$recipesWrapper;
  }

  updateFilters(foundRecipes) {
    // Met a jour le contenu des filtres
    console.log('metre a jour le contenu des filtres');
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

  searchRecipe(searchTerm) {
    const recipesList = this.recipesData;
    const recipesFound = this.getRecipeWithTerm(recipesList, searchTerm);

    this.displayRecipes(recipesFound);
    this.updateCounter(recipesFound);
    this.updateFilters(recipesFound);
  }
}
