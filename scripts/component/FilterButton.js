import { tagsList, termValue } from '../utils/SearchFilter.js';
import { filterMenuWithTerms } from '../utils/dataFilters.js';
import { updateSearch, updateView } from '../utils/update.js';
import { Filtertag } from './FilterTag.js';

export class FilterButton {
  constructor(text, dataFilter, data, searchFilter) {
    this.text = text;
    this.dataFilter = dataFilter;
    this.data = data;
    this.searchFilter = searchFilter;
  }

  convertText(text) {
    const correspondances = {
      Ingrédients: 'ingredients',
      Ustensils: 'ustensils',
      Appareils: 'appliance',
    };

    // Vérifier si le texte passé correspond à une correspondance
    if (correspondances[text]) {
      // Si une correspondance existe
      return correspondances[text];
    } else {
      // Si aucune correspondance n'a été trouvée
      return text;
    }
  }

  handleClick(buttonElement) {
    // DOM elements
    const $dropdownContent = buttonElement.parentElement.querySelector(
      '.filter__dropdown-content'
    );
    const $iconDropdown = buttonElement.querySelector('.fa');

    // Toggle class on click
    $iconDropdown.classList.toggle('fa-rotate-180');
    $dropdownContent.classList.toggle('show');

    // Show or hide the content
    $dropdownContent.style.display = $dropdownContent.classList.contains('show')
      ? 'block'
      : 'none';
  }

  handleItemClick($item) {
    $item.classList.toggle('selected');
    const name = $item.textContent.toLowerCase();
    const className = name.replace(/\s+/g, '');
    const itemText = $item.textContent;

    const $tagsDomParent = document.querySelector('.tags__wrapper');

    if (tagsList.includes(itemText)) {
      const indexToRemove = tagsList.indexOf(itemText);
      if (indexToRemove !== -1) {
        tagsList.splice(indexToRemove, 1);
      }

      let $itemToRemove = document.querySelector(
        `.tags__wrapper-item-${className}`
      );

      updateSearch(termValue, tagsList);
      updateView();

      $itemToRemove.remove();
    } else {
      const Tag = new Filtertag(itemText, this.data);
      const $tagElement = Tag.createTag();
      $tagsDomParent.appendChild($tagElement);
      tagsList.push(itemText);
    }

    updateSearch(termValue, tagsList);
    updateView();
  }

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
          console.log('tag trouvé', tag, menu);
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

  createFilterButton() {
    const $buttonContainer = document.createElement('div');
    $buttonContainer.classList.add('filter__dropdown');

    const $button = document.createElement('button');
    $button.classList.add('filter__dropdown-btn');
    $button.textContent = this.text;

    const $icon = document.createElement('i');
    $icon.classList.add('fa', 'fa-chevron-down');
    $button.appendChild($icon);

    $buttonContainer.appendChild($button);

    const $dropdownContent = document.createElement('div');
    $dropdownContent.classList.add('filter__dropdown-content');

    const $searchBar = document.createElement('input');
    $searchBar.setAttribute('type', 'search');
    $searchBar.classList.add('filter__dropdown-search');
    $dropdownContent.appendChild($searchBar);

    const modifiedText = this.convertText(this.text);

    this.createMenuList(this.dataFilter, $dropdownContent, modifiedText);

    $searchBar.addEventListener('input', () => {
      const $searchItems = document.querySelectorAll(`.${modifiedText}`);
      $searchItems.forEach(function (item) {
        item.remove();
      });

      const dataFiltered = filterMenuWithTerms(
        this.dataFilter,
        $searchBar.value
      );

      this.createMenuList(dataFiltered, $dropdownContent, modifiedText);
    });

    $button.addEventListener('click', () => this.handleClick($button));

    $buttonContainer.appendChild($dropdownContent);
    this.convertText(this.text);

    return $buttonContainer;
  }
}
