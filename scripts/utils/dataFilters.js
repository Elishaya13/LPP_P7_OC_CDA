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
    // Get the first character of the string and convert it to uppercase.
    const firstLetterCapitalized = string.charAt(0).toUpperCase();
    // Get the rest of the string from the second character.
    const restOfString = string.slice(1);
    // Combine the first character in uppercase with the rest of the string.
    const result = firstLetterCapitalized + restOfString;
    // Return the new string with the first letter capitalized.
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

    uniqueAppliances.add(recipe.appliance);
  });

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
  let dataFound = [];

  for (let data of dataMenu) {
    const searchTermToLowerCase = searchTerm.toLowerCase();
    const dataToLowerCase = data.toLowerCase();
    if (dataToLowerCase.includes(searchTermToLowerCase)) {
      dataFound.push(data);
    }
  }
  return dataFound;
}
