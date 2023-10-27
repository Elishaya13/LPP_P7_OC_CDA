/**
 * Filters and extracts unique recipe data including ingredients, utensils, and appliances from a list of recipes.
 *
 * @param {Array<Object>} recipes - An array of recipe objects to filter and extract data from.
 * @returns {Object} An object containing three arrays: ingredients, ustensils (utensils), and appliances.
 *
 * @property {string[]} ingredients - An array of unique ingredients found in the recipes.
 * @property {string[]} ustensils - An array of unique utensils found in the recipes.
 * @property {string[]} appliances - An array of unique appliances found in the recipes.
 */
export function filterRecipeData(recipes) {
  const uniqueIngredients = new Set();
  const uniqueUstensils = new Set();
  const uniqueAppliances = new Set();

  /**
   * Capitalizes the first letter of a string.
   *
   * @param {string} string - The input string.
   * @returns {string} A new string with the first letter capitalized.
   */
  function capitalizeFirstLetter(string) {
    const firstLetterCapitalized = string.charAt(0).toUpperCase();
    const restOfString = string.slice(1);
    const result = firstLetterCapitalized + restOfString;
    return result;
  }

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredientData) => {
      uniqueIngredients.add(ingredientData.ingredient);
    });

    recipe.ustensils.forEach((ustensil) => {
      const ustensilCapitalize = capitalizeFirstLetter(ustensil);
      uniqueUstensils.add(ustensilCapitalize);
    });

    // Add the appliance to the unique appliances set.
    uniqueAppliances.add(recipe.appliance);
  });

  // Convert sets to arrays and return the result.
  return {
    ingredients: Array.from(uniqueIngredients),
    ustensils: Array.from(uniqueUstensils),
    appliances: Array.from(uniqueAppliances),
  };
}

/**
 * Filters a menu list based on a search term and returns matching items.
 *
 * @param {string[]} dataMenu - An array of menu items to filter.
 * @param {string} searchTerm - The search term to filter the menu items.
 * @returns {string[]} An array of menu items that match the search term.
 */
export function filterMenuWithTerms(dataMenu, searchTerm) {
  const searchTermToLowerCase = searchTerm.toLowerCase();

  const filteredMenuData = dataMenu.filter((data) => {
    const dataToLowerCase = data.toLowerCase();
    const includesSearchTerm = dataToLowerCase.includes(searchTermToLowerCase);

    return includesSearchTerm;
  });

  return filteredMenuData;
}
