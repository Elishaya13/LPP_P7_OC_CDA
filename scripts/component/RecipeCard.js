/**
 * Represents a recipe card that displays recipe details.
 */
export class RecipeCard {
  /**
   * Creates a new RecipeCard.
   *
   * @param {Object} data - The data object containing recipe information.
   * @param {string} data.image - The URL of the recipe's image.
   * @param {string} data.name - The name of the recipe.
   * @param {string} data.description - The description of the recipe.
   * @param {Array<Object>} data.ingredients - An array of ingredient objects.
   * @param {number} data.time - The time required to prepare the recipe (in minutes).
   */
  constructor(data) {
    this.image = data.image;
    this.name = data.name;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.time = data.time;
  }

  /**
   * Creates an HTML string representing the recipe card.
   *
   * @returns {string} The HTML string of the recipe card.
   */
  createRecipeCard() {
    const ingredientsHtml = this.ingredients
      .map(
        (ingredient) => `
      <div class="ingredient__item">
        <span class="ingredient__item-name">${ingredient.ingredient}</span>
  
        ${
          ingredient.quantity !== undefined
            ? `<span class="ingredient__item-qty">${ingredient.quantity}${
                ingredient.unit ? ' ' + ingredient.unit : ''
              }</span>`
            : ''
        }
      </div>
    `
      )
      .join('');

    const $card = `
      <div class="recipe__card">
        <div class="recipe__card__header">
          <img class="recipe__card__header-img" src='assets/recipes/${this.image}'></img>
        </div>
        <span class="recipe__card__header-time">${this.time}min</span>
        <div class="recipe__card__content">
          <div class="recipe__card__content-title">
            <h2>${this.name}</h2>
          </div>
          <div class="recipe__card__content-recipe">
            <h3> RECETTE </h3>
            <p>${this.description}</p>
          </div>
         
          <div class="recipe__card__content-ingredients">
            <h3 class="ingredients__list-title"> INGRÉDIENTS </h3>
            <div class="ingredients__list-container">
            ${ingredientsHtml}
          </div>
        </div>
      </div>
  
      `;

    return $card;
  }
}
