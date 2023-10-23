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
   *
   * @param {*} searchTerm resultat de la value dun'input searchbar
   * @returns
   */
  filterWithTerms(recipesList, searchTerm) {
    let recipesFound = [];

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
            // Then, break the loop to prevent duplicate additions for the same recipe.
            recipesFound.push(recipe);
            break;
          }
        }
      }
    }
    if (searchTerm.length < 3) {
      recipesFound = [];
      recipesFiltered = [];
      console.log('moins de trois', recipesFiltered);
      //this.filterWithTags(tagsList)
    }

    recipesWithTerms = recipesFound;

    return recipesFound;
  }

  filterWithTermInMenu(dataMenu, searchterm) {
    // Recois un tableau de datas filtrées des recettes dans le menu par: ou ingredients, ou appareils ou ustensils
    // Recois le terme saisie (3 lettres min) dans l'input et cherche la correspondance dans la list des datas du menu
    // Retourne un tableau correspondant
    // Met a jour la vue de ce menu avec les nouveau mots
    let recipesFound = [];
    let recipesMatchWithTerm = [];
  }

  filterWithTags(recipesList, searchTags) {
    let recipesFound = [];
    let recipesToFilter = [];

    if (recipesFiltered.length > 0) {
      recipesToFilter = recipesFiltered;
    } else {
      recipesToFilter = recipesList;
    }

    if (searchTags.length > 0) {
      for (let recipe of recipesToFilter) {
        let allTagsFound = true; // Indicateur pour vérifier si tous les tags sont présents

        for (let searchTag of searchTags) {
          let tagFoundInRecipe = false; // Indicateur pour vérifier si le tag est présent dans la recette

          for (let ingredient of recipe.ingredients) {
            const item = ingredient.ingredient;
            if (item.includes(searchTag)) {
              tagFoundInRecipe = true;
              break; // Sort de la boucle dès qu'un ingrédient est trouvé
            }
          }

          for (let ustensil of recipe.ustensils) {
            const searchTagsToLowerCase = searchTag.toLowerCase();
            if (ustensil.includes(searchTagsToLowerCase)) {
              tagFoundInRecipe = true;
            }
          }

          if (recipe.appliance.includes(searchTag)) {
            tagFoundInRecipe = true;
          }

          if (!tagFoundInRecipe) {
            // Si le tag n'est pas trouvé dans une catégorie marquer comme false
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

  search(searchTerms, searchTags) {
    termValue = searchTerms;

    let recipesToDisplay = [];

    const filteredBytags = this.filterWithTags(
      this.fullRecipesData,
      searchTags
    );

    const filteredByTerms = this.filterWithTerms(
      this.fullRecipesData,
      searchTerms
    );

    //si les deux tableau ont des recettes
    if (recipesWithTag.length > 0 && recipesWithTerms.length > 0) {
      //match
      console.log('retourn tableau match des deux tableaux');
      recipesFiltered = [];
      const recipesWithMatchingID = recipesWithTerms.filter((tagRecipe) =>
        recipesWithTag.some((termRecipe) => termRecipe.id === tagRecipe.id)
      );
      recipesToDisplay = recipesWithMatchingID;
    }

    // s'il n'y a que le tableau de tag qui a des recettes
    if (recipesWithTag.length > 0 && recipesWithTerms.length === 0) {
      console.log('retourne tableau correspondance que des tags');
      recipesFiltered = [];
      recipesWithTag = this.filterWithTags(this.fullRecipesData, tagsList);

      recipesToDisplay = recipesWithTag;
      //recipesToDisplay = filteredBytags;
    }

    if (recipesWithTag.length === 0 && recipesWithTerms.length > 0) {
      console.log('retourne le tableau correspondance que de termes');
      //recipesToDisplay = recipesWithTerms;
      recipesToDisplay = filteredByTerms;
    }

    if (recipesWithTag.length === 0 && recipesWithTerms.length === 0) {
      console.log('retourne tout le tableau');
      recipesToDisplay = this.fullRecipesData;
    }

    recipesFiltered = recipesToDisplay;

    console.log('recipeFiltered[]', recipesFiltered);
    console.log('a afficher', recipesToDisplay);
  }
}
