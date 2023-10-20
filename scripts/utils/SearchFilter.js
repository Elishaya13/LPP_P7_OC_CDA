export let recipesFiltered = []; //Le tableau des objets filtrés
export let tagsList = []; // le tableau des tags selectionné

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
  filterWithTerms(recipes, searchTerm) {
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
    console.log('recipes found dans filter terms', recipesFound);
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

  filterWithTags(searchTags) {
    console.log('lancement filtre par tag sur: ', searchTags);
    let recipesFound = [];
    let recipesToFilter = [];

    if (recipesFiltered.length > 0) {
      recipesToFilter = recipesFiltered;
    } else {
      recipesToFilter = this.fullRecipesData;
    }

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

        if (recipe.ustensils.includes(searchTag)) {
          tagFoundInRecipe = true;
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

    console.log(recipesFound);
    return recipesFound;
  }

  // FONCTION PARENTE
  // searchTags = ["blender", "sucre"]
  //searchTerms = "cho" , "choco" , "chou" // value d' input

  search(searchTerms, searchTags) {
    console.log('searchterm', searchTerms);

    console.log('searchtag', searchTags);

    let recipesToFilter = this.fullRecipesData;
    console.log('taglist', tagsList);

    // si le terme recherché est superieur a 3 lettres
    if (searchTerms.length >= 3) {
      //recupere le tableau des recettes par termes
      const filteredByTerm = this.filterWithTerms(recipesToFilter, searchTerms);
      recipesToFilter = filteredByTerm;
    } else {
      console.log('else pas searchterm');
      // sinon on utilise la methode filterWithTags pour filtrer sur les tags
      const filteredByTags = this.filterWithTags(tagsList);
      console.log(tagsList);
      console.log(filteredByTags);
      recipesToFilter = filteredByTags;
    }

    recipesFiltered = recipesToFilter;
    console.log('recipe to filter', recipesToFilter);
    console.log('recipe filtered', recipesFiltered);
  }
}
