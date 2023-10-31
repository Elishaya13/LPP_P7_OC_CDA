import { tagsList } from '../store/store.js';
import { filterMenuWithTerms } from '../utils/dataFilters.js';
import { updateSearch, updateView } from '../utils/update.js';
import { Filtertag } from './FilterTag.js';

/**
 * A class representing a filter button used to filter recipes by categories (ingredients, appliances, ustensils).
 */
export class FilterButton {
  /**
   * Create a new FilterButton instance.
   *
   * @param {string} text - The text displayed on the filter button.
   * @param {Array} dataFilter - The list of filter data for this category.
   * @param {Array} data - The list of all recipes data.
   */
  constructor(text, dataFilter) {
    this.text = text;
    this.dataFilter = dataFilter;
  }

  /**
   * Convert the display text to a corresponding category name.
   *
   * @param {string} title - The title to be converted.
   * @returns {string} - The corresponding category name or the original text if no match is found.
   */
  convertTitle(title) {
    const correspondances = {
      Ingrédients: 'ingredients',
      Ustensils: 'ustensils',
      Appareils: 'appliance',
    };

    if (correspondances[title]) {
      return correspondances[title];
    } else {
      return title;
    }
  }

  /**
   * Handle a click event on the filter button.
   *
   * @param {Element} buttonElement - The button element that was clicked.
   */
  handleClick(buttonElement) {
    const $dropdownContent = buttonElement.parentElement.querySelector(
      '.filter__dropdown-content'
    );
    const $iconDropdown = buttonElement.querySelector('.fa');

    // Toggle class on click
    $iconDropdown.classList.toggle('fa-rotate-180');
    $dropdownContent.classList.toggle('show');

    // Update the display property to either 'block' (visible) or 'none' (hidden).
    $dropdownContent.style.display = $dropdownContent.classList.contains('show')
      ? 'block'
      : 'none';
  }

  /**
   * Handle the click event when a filter item is clicked in the dropdown menu.
   *
   * @param {Element} $item - The HTML element representing the clicked filter item.
   */
  handleItemClick($item) {
    // Toggle the 'selected' class to visually indicate the item is selected or deselected.
    $item.classList.toggle('selected');
    const name = $item.textContent.toLowerCase();
    const className = name.replace(/\s+/g, '');
    const itemText = $item.textContent;

    // Get the DOM parent element for displaying selected tags.
    const $tagsDomParent = document.querySelector('.tags__wrapper');
    const inputValue = document.getElementById('search').value;

    if (tagsList.includes(itemText)) {
      // If the item's text is already in the list of selected tags, remove it.
      const indexToRemove = tagsList.indexOf(itemText);
      if (indexToRemove !== -1) {
        tagsList.splice(indexToRemove, 1);
      }

      // Find and remove the corresponding tag element in the UI.
      let $itemToRemove = document.querySelector(
        `.tags__wrapper-item-${className}`
      );
      $itemToRemove.remove();

      // Update the search filter and refresh the view with the updated tags.
      updateSearch(inputValue, tagsList);
      updateView();
    } else {
      // If the item's text is not in the list of selected tags, add it.
      const Tag = new Filtertag(itemText);
      const $tagElement = Tag.createTag();
      $tagsDomParent.appendChild($tagElement);
      tagsList.push(itemText);
    }

    // Update the search filter and refresh the view with the updated tags.
    updateSearch(inputValue, tagsList);
    updateView();
  }

  /**
   * Create a menu list of filter items within the dropdown.
   *
   * @param {Array} dataMenu - The list of filter items to display.
   * @param {Element} parentElt - The parent element where the menu list will be added.
   * @param {string} text - The category recipe title.
   */
  createMenuList(dataMenu, parentElt, text) {
    dataMenu.forEach((menu) => {
      const $item = document.createElement('div');

      const className = `search-item ${text}`;
      $item.className = className;

      $item.textContent = menu;
      parentElt.appendChild($item);

      const existingCloseIcon = $item.querySelector('.fa-circle-xmark');

      $item.addEventListener('click', () => this.handleItemClick($item));

      for (let tag of tagsList) {
        if (tag === menu) {
          $item.classList.add('selected');

          if (!existingCloseIcon) {
            const $closeIcon = document.createElement('i');
            $closeIcon.classList.add('fa-solid', 'fa-circle-xmark');
            $item.appendChild($closeIcon);
          }
        }
      }
    });
  }

  /**
   * Create the filter button and its dropdown content.
   *
   * @returns {Element} - The HTML element representing the filter button and its content.
   */
  createFilterButton() {
    // Create a container for the filter button and its dropdown
    const $buttonContainer = document.createElement('div');
    $buttonContainer.classList.add('filter__dropdown');

    // Create the filter button itself
    const $button = document.createElement('button');
    $button.classList.add('filter__dropdown-btn');
    $button.textContent = this.text;

    // Create an icon element for the button
    const $icon = document.createElement('i');
    $icon.classList.add('fa', 'fa-chevron-down');
    $button.appendChild($icon);

    $buttonContainer.appendChild($button);

    // Create the dropdown content
    const $dropdownContent = document.createElement('div');
    $dropdownContent.classList.add('filter__dropdown-content');

    // Create a search bar input element within the dropdown
    const $searchBar = document.createElement('input');
    $searchBar.setAttribute('type', 'search');
    $searchBar.classList.add('filter__dropdown-search');
    $dropdownContent.appendChild($searchBar);

    // Modify the category text for filtering
    const modifiedTitle = this.convertTitle(this.text);

    // Create the menu list within the dropdown
    this.createMenuList(this.dataFilter, $dropdownContent, modifiedTitle);

    // Add an input event listener to the search bar for dynamic filtering
    $searchBar.addEventListener('input', (e) => {
      const inputValue = e.target.value;
      // Initialize a variable to store the sanitized value
      let sanitizedValue = inputValue;
      // Remove special characters that might be used for HTML injection
      sanitizedValue = sanitizedValue.replace(/[<>'"&]/g, '');
      e.target.value = sanitizedValue;

      const $searchItems = document.querySelectorAll(`.${modifiedTitle}`);
      $searchItems.forEach(function (item) {
        item.remove();
      });

      const dataFiltered = filterMenuWithTerms(this.dataFilter, sanitizedValue);

      this.createMenuList(dataFiltered, $dropdownContent, modifiedTitle);
    });

    // Add a click event listener to handle dropdown visibility
    $button.addEventListener('click', () => this.handleClick($button));

    $buttonContainer.appendChild($dropdownContent);
    this.convertTitle(this.text);

    return $buttonContainer;
  }
}
