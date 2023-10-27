import { Header } from '../templates/Header.js';
import { Main } from '../templates/Main.js';
import { fetchData } from '../utils/fetch.js';
import { tagsList } from '../store/store.js';
import { updateSearch, updateView } from '../utils/update.js';

/**
 * The main class for the application.
 */
class Index {
  constructor() {
    this.$headerWrapper = document.getElementById('header_wrapper');
    this.$mainContent = document.getElementById('main_content');
    this.recipesData = null;
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

    $searchInput.addEventListener('input', (e) => {
      const inputValue = e.target.value;

      let sanitizedValue = inputValue;

      // Remove special characters that might be used for HTML injection
      sanitizedValue = sanitizedValue.replace(/[<>'"&]/g, '');

      // Apply the sanitized value back to the input
      e.target.value = sanitizedValue;

      if (inputValue.length >= 3) {
        updateSearch(inputValue, tagsList);
      } else {
        updateSearch('', tagsList);
      }

      updateView();
    });
  }
}
const index = new Index();
index.initialize();
