/**
 * Filters and extracts unique recipe data including ingredients, utensils, and appliances from a list of recipes.
 *
 * @param {Array<Object>} recipes - An array of recipe objects to filter and extract data from.
 * @returns {Object} An object containing three arrays: ingredients, ustensils (utensils), and appliances.
 * - ingredients: An array of unique ingredients found in the recipes.
 * - ustensils: An array of unique utensils found in the recipes.
 * - appliances: An array of unique appliances found in the recipes.
 */
export function filterRecipeData(recipes) {
  const uniqueIngredients = new Set();
  const uniqueUstensils = new Set();
  const uniqueAppliances = new Set();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
