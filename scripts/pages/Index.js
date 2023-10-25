import { Header } from '../templates/Header.js';
import { Main } from '../templates/Main.js';
import {
  displayCounter,
  displayFilters,
  displayRecipes,
} from '../utils/display.js';

import { fetchData } from '../utils/fetch.js';
import { recipesFiltered, SearchFilter } from '../utils/SearchFilter.js';
import { tagsList } from '../utils/SearchFilter.js';

/**
 * The main class for the application.
 */
class Index {
  constructor() {
    this.$headerWrapper = document.getElementById('header_wrapper');
    this.$mainContent = document.getElementById('main_content');
    this.recipesData = null;
    this.searchFilter = null;
  }

  /**
   * Initialize the application by creating the header and loading recipe data.
   *
   * @async
   */
  async initialize() {
    const headerTemplate = new Header();
    const headerHtml = headerTemplate.createHeader();
    this.$headerWrapper.innerHTML = headerHtml;

    if (!this.recipesData) {
      try {
        this.recipesData = await fetchData();
      } catch (error) {
        console.log('Fetch data Error : ', error);
      }
    }
    this.searchFilter = new SearchFilter(this.recipesData);
    this.addMainContent();
  }

  /**
   * Add the main content of the application, including filters, tags, and recipes.
   *
   * @async
   */
  async addMainContent() {
    const mainTemplate = new Main(this.recipesData);
    const { $filtersWrapper, $tagsWrapper, $recipesWrapper } =
      await mainTemplate.createMain();
    this.$mainContent.appendChild($filtersWrapper);
    this.$mainContent.appendChild($tagsWrapper);
    this.$mainContent.appendChild($recipesWrapper);

    const $searchInput = document.getElementById('search');

    $searchInput.addEventListener('input', () => {
      const inputValue = $searchInput.value;
      let recipesToDisplay = [];

      if (inputValue.length >= 3) {
        this.searchFilter.search(inputValue, tagsList);
        recipesToDisplay = recipesFiltered;
      } else {
        this.searchFilter.search('', tagsList);
        recipesToDisplay = recipesFiltered;
      }

      displayRecipes($recipesWrapper, recipesToDisplay);
      displayFilters($filtersWrapper, recipesToDisplay);
      displayCounter(recipesToDisplay);
    });
  }
}
const index = new Index();
index.initialize();
