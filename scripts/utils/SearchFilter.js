import { displayNoResult, removeNoResultMessage } from './display.js';

export let recipesFiltered = []; //Le tableau des objets filtrés
export let tagsList = []; // le tableau des tags selectionné
export let termValue = '';
let recipesWithTag = [];
let recipesWithTerms = [];

export class SearchFilter {
  //Initialise la classe avec toutes les data (50 recettes)
  constructor(dataRecipes) {
    this.fullRecipesData = dataRecipes;
  }

  /**
   * Filter a list of recipes based on a search term.
   *
   * @param {Array} recipesList - The list of recipes to filter.
   * @param {string} searchTerm - The search term entered in a search bar.
   * @returns {Array} - An array of recipes that match the search term.
   */
  filterWithTerms(recipesList, searchTerm) {
    let recipesFound = [];

    removeNoResultMessage();

    for (let recipe of recipesList) {
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
            recipesFound.push(recipe);
            break; // Break the loop to prevent duplicate additions for the same recipe.
          }
        }
      }
    }
    // Check if the search term is too short (less than 3 characters), and reset the results.
    if (searchTerm.length < 3) {
      recipesFound = [];
      recipesFiltered = [];
    }
    if (recipesFound.length === 0 && searchTerm.length >= 3) {
      // No recipes found and the search term has at least 3 characters
      displayNoResult(searchTerm);
    }

    // Update the global 'recipesWithTerms' variable with the filtered results.
    recipesWithTerms = recipesFound;

    return recipesFound;
  }

  /**
   * Filter a list of recipes based on an array of search tags. Returns recipes that match all provided tags.
   *
   * @param {Array} recipesList - The list of recipes to filter.
   * @param {Array} searchTags - An array of tags to filter recipes by.
   * @returns {Array} - An array of recipes that match all the provided tags.
   */
  filterWithTags(recipesList, searchTags) {
    let recipesFound = [];
    let recipesToFilter = recipesList;

    if (searchTags.length > 0) {
      for (let recipe of recipesToFilter) {
        let allTagsFound = true; // Indicator to check if all tags are present in the recipe

        for (let searchTag of searchTags) {
          let tagFoundInRecipe = false; // Indicator to check if the tag is present in the recipe

          // Check if the tag is found in the ingredients of the recipe
          for (let ingredient of recipe.ingredients) {
            const item = ingredient.ingredient;
            if (item.includes(searchTag)) {
              tagFoundInRecipe = true;
              break;
            }
          }

          // Check if the tag is found in the ustensils of the recipe
          for (let ustensil of recipe.ustensils) {
            const searchTagsToLowerCase = searchTag.toLowerCase();
            if (ustensil.includes(searchTagsToLowerCase)) {
              tagFoundInRecipe = true;
            }
          }

          // Check if the tag is found in appliance of the recipe
          if (recipe.appliance.includes(searchTag)) {
            tagFoundInRecipe = true;
          }

          if (!tagFoundInRecipe) {
            // If the tag is not found in any category, mark it as false
            allTagsFound = false;
            break;
          }
        }

        if (allTagsFound) {
          recipesFound.push(recipe);
        }
      }
    }

    recipesWithTag = recipesFound;

    return recipesFound;
  }

  /**
   * Search for recipes based on search terms and tags.
   * @param {string[]} searchTerms - The search terms to filter recipes by.
   * @param {string[]} searchTags - The tags to filter recipes by.
   */
  search(searchTerms, searchTags) {
    termValue = searchTerms;

    const fullRecipes = this.fullRecipesData;

    let recipesToDisplay = [];

    // Filter recipes based on tags
    const filteredWithTags = this.filterWithTags(
      this.fullRecipesData,
      searchTags
    );

    // Filter recipes based on search terms
    const filteredByTerms = this.filterWithTerms(
      this.fullRecipesData,
      termValue
    );

    // If both tag and term filters are empty, return the full list
    if (recipesWithTag.length === 0 && recipesWithTerms.length === 0) {
      console.log('Return the entire recipe list');
      recipesToDisplay = fullRecipes;
    }

    // If both tag and term filters have recipes
    if (recipesWithTag.length > 0 && recipesWithTerms.length > 0) {
      console.log('Return the list of recipes that match both filters');
      recipesFiltered = [];
      recipesWithTag = filteredWithTags;

      let recipesWithMatchingID = [];

      for (let termRecipe of recipesWithTerms) {
        for (let tagRecipe of recipesWithTag) {
          if (tagRecipe.id === termRecipe.id) {
            recipesWithMatchingID.push(tagRecipe);
            break;
          }
        }
      }

      recipesToDisplay = recipesWithMatchingID;
    }

    // If only the tag filter has recipes
    if (recipesWithTag.length > 0 && recipesWithTerms.length === 0) {
      console.log('Return the list of recipes that match only the tag filter');
      recipesFiltered = [];
      recipesWithTag = this.filterWithTags(this.fullRecipesData, tagsList);
      recipesToDisplay = recipesWithTag;
    }

    // If only the term filter has recipes
    if (recipesWithTag.length === 0 && recipesWithTerms.length > 0) {
      console.log('Return the list of recipes that match only the term filter');
      recipesToDisplay = filteredByTerms;
    }

    recipesFiltered = recipesToDisplay;
  }
}
