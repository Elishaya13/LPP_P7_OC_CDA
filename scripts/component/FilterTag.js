import { tagsList } from '../utils/SearchFilter.js';
import { updateSearch, updateView } from '../utils/update.js';

/**
 * Represents a filter tag for ingredients, utensils, or appliances.
 */
export class Filtertag {
  /**
   * Creates a new filter tag.
   *
   * @param {string} value - The name or value of the filter tag.
   */
  constructor(value) {
    this.name = value;
  }

  handleRemoveTag($tagElement) {
    const $selectedItems = document.querySelectorAll('.selected');
    $selectedItems.forEach(($selected) => {
      if ($selected.textContent === this.name) {
        $selected.classList.remove('selected');

        const $iconToRemove = $selected.querySelector('i');
        if ($iconToRemove) {
          $iconToRemove.remove();
        }
      }
    });

    $tagElement.remove();
  }

  updateTagsList(term) {
    const indexToRemove = tagsList.indexOf(term);

    if (indexToRemove !== -1) {
      tagsList.splice(indexToRemove, 1);
    }
  }

  createTag() {
    const name = this.name.toLowerCase();
    const tagClass = name.replace(/\s+/g, '');

    const $tagElement = document.createElement('div');
    $tagElement.classList.add(`tags__wrapper-item-${tagClass}`);

    const $button = document.createElement('button');
    $button.textContent = this.name;

    const $icon = document.createElement('i');
    $icon.classList.add('fa-solid', 'fa-xmark');
    $button.appendChild($icon);

    $tagElement.appendChild($button);

    $icon.addEventListener('click', () => {
      this.handleRemoveTag($tagElement);
      this.updateTagsList(this.name);

      const input = document.getElementById('search');
      const inputValue = input.value;

      updateSearch(inputValue, tagsList);
      updateView();
    });
    return $tagElement;
  }
}
