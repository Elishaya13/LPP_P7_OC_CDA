import { tagsList } from '../utils/SearchFilter.js';
import { updateSearch, updateView } from '../utils/update.js';

export class Filtertag {
  constructor(value, data) {
    this.name = value;

    this.data = data;
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
      console.log(`Elément "${term}" supprimé de tagsList`);
    }
  }

  createTag() {
    const name = this.name.toLowerCase();
    const buttonClass = name.replace(/\s+/g, '');

    const $tagElement = document.createElement('div');
    $tagElement.classList.add(`tags__wrapper-item-${buttonClass}`);

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
      console.log('avant update', tagsList);
      updateSearch(inputValue, tagsList);
      updateView();
    });
    return $tagElement;
  }
}
