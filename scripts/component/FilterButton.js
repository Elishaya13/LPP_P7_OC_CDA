import { Search } from '../utils/Search.js';
import { Filtertag } from './FilterTag.js';

export class FilterButton {
  constructor(text, dataFilter, data) {
    this.text = text;
    this.dataFilter = dataFilter;
    this.data = data;
  }

  handleClick(buttonElement) {
    // DOM elements
    const $dropdownContent = buttonElement.parentElement.querySelector(
      '.filter__dropdown-content'
    );
    const $icoDropdown = buttonElement.querySelector('.fa');

    // Toggle class on click
    $icoDropdown.classList.toggle('fa-rotate-180');
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

    const isSelected = $item.classList.contains('selected');

    if (isSelected) {
      const $closeIcon = document.createElement('i');
      $closeIcon.classList.add('fa-solid', 'fa-circle-xmark');
      $item.appendChild($closeIcon);

      const $tagsDomParent = document.querySelector('.tags__wrapper');
      const Tag = new Filtertag($item.textContent);
      const $tagElement = Tag.createTag();
      console.log('function filtre sur ' + $item.textContent);
      $tagsDomParent.appendChild($tagElement);

      const search = new Search(this.data);
      search.searchRecipeWithTag($item.textContent);
    } else {
      const $closeIcon = $item.querySelector('.fa-circle-xmark');
      const $tagElement = document.querySelector(
        `.tags__wrapper-item-${className}`
      );

      if ($closeIcon) {
        $closeIcon.remove();
        $tagElement.remove();
      }
    }
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

    const $search = document.createElement('input');
    $search.setAttribute('type', 'search');
    $search.classList.add('filter__dropdown-search');
    $dropdownContent.appendChild($search);

    const filterData = this.dataFilter;

    filterData.forEach((data) => {
      const $item = document.createElement('div');
      $item.classList.add('search-item');
      $item.textContent = data;
      $dropdownContent.appendChild($item);

      $item.addEventListener('click', () => this.handleItemClick($item));
    });

    $button.addEventListener('click', () => this.handleClick($button));

    $buttonContainer.appendChild($dropdownContent);

    return $buttonContainer;
  }
}
