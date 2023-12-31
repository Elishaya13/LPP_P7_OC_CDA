export class SearchFilter {
  constructor(dataRecipes) {
    this.fullRecipesData = dataRecipes;
    this.recipesWithTag = [];
    this.recipesWithTerms = [];
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

    // Check if the search term is too short (less than 3 characters), and reset the results.
    if (searchTerm.length < 3) {
      recipesFound = [];
    }

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

    // Update 'recipesWithTerms' variable with the filtered results.
    this.recipesWithTerms = recipesFound;

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

    if (searchTags.length > 0) {
      for (let recipe of recipesList) {
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

    this.recipesWithTag = recipesFound;

    return recipesFound;
  }

  /**
   * Search for recipes based on search terms and tags.
   * @param {string} searchTerms - The search terms to filter recipes by.
   * @param {string[]} searchTags - The tags to filter recipes by.
   * @returns {Array} An array of recipes matching the provided search criteria.
   */
  search(searchTerms, searchTags) {
    // Filter recipes based on tags
    let filteredWithTags = this.filterWithTags(
      this.fullRecipesData,
      searchTags
    );

    let filteredByTerms = [];
    // Filter recipes based on search terms
    if (searchTerms.length >= 3) {
      filteredByTerms = this.filterWithTerms(this.fullRecipesData, searchTerms);
    } else if (filteredByTerms.length === 0) {
      this.recipesWithTerms = [];
    }

    // If both tag and term filters are empty, return the full list
    // Or if searchTerms exist and no recipes are found, return an empty array
    if (
      this.recipesWithTag.length === 0 &&
      this.recipesWithTerms.length === 0
    ) {
      if (searchTerms.length === 0) {
        return this.fullRecipesData;
      } else {
        return [];
      }
    }

    // If only the tag filter has recipes
    if (this.recipesWithTag.length > 0 && this.recipesWithTerms.length === 0) {
      return filteredWithTags;
    }

    // If only the term filter has recipes
    if (this.recipesWithTag.length === 0 && this.recipesWithTerms.length > 0) {
      return filteredByTerms;
    }

    // If both tag and term filters have recipes
    // console.log('Return the list of recipes that match both filters');
    let recipesWithMatchingID = [];

    for (let termRecipe of this.recipesWithTerms) {
      for (let tagRecipe of this.recipesWithTag) {
        if (tagRecipe.id === termRecipe.id) {
          recipesWithMatchingID.push(tagRecipe);
          break;
        }
      }
    }
    return recipesWithMatchingID;
  }
}
