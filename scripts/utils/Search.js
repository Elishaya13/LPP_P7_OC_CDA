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

  // Affichage des recettes trouvées
  displayRecipes(foundRecipes) {
    this.removeRecipes(this.$recipesWrapper);

    for (let recipe of foundRecipes) {
      const card = new RecipeCard(recipe);
      const cardHTML = card.createRecipeCard();
      this.$recipesWrapper.innerHTML += cardHTML;
    }
    return this.$recipesWrapper;
  }

  updateFilters() {
    // Met a jour le contenu des filtres
    console.log('metre a jour le contenu des filtres');
  }

  getRecipeWithTerm(recipes, searchTerm) {
    let recipesFound = [];
    for (let recipe of recipes) {
      const nameLowerCase = recipe.name.toLowerCase();
      const descriptionLowerCase = recipe.description.toLowerCase();

      if (
        nameLowerCase.includes(searchTerm) ||
        descriptionLowerCase.includes(searchTerm)
      ) {
        recipesFound.push(recipe);
      } else {
        for (let ingredient of recipe.ingredients) {
          const ingredientLowerCase = ingredient.ingredient.toLowerCase();
          if (ingredientLowerCase.includes(searchTerm)) {
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
    const foundData = [];

    const recipesFound = this.getRecipeWithTerm(recipesList, searchTerm);
    foundData.push(...recipesFound);

    this.displayRecipes(foundData);
  }
}
