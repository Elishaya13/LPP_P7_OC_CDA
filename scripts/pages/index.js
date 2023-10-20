import { Header } from '../templates/Header.js';
import { Main } from '../templates/Main.js';
import { Display } from '../utils/Display.js';
import { fetchData } from '../utils/fetch.js';
import { recipesFiltered, SearchFilter } from '../utils/SearchFilter.js';
import { tagsList } from '../utils/SearchFilter.js';

class Index {
  constructor() {
    this.$headerWrapper = document.getElementById('header_wrapper');
    this.$mainContent = document.getElementById('main_content');
    this.recipesData = null;

    this.searchFilter = null;
  }
  async main() {
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
  async addMainContent() {
    const mainTemplate = new Main(this.recipesData, this.searchFilter);
    const { $filtersWrapper, $tagsWrapper, $recipesWrapper } =
      await mainTemplate.createMain();
    this.$mainContent.appendChild($filtersWrapper);
    this.$mainContent.appendChild($tagsWrapper);
    this.$mainContent.appendChild($recipesWrapper);

    const $searchInput = document.getElementById('search');

    $searchInput.addEventListener('input', () => {
      const display = new Display(this.searchFilter);
      const inputValue = $searchInput.value;
      let recipesToDisplay = [];

      if (inputValue.length >= 3) {
        this.searchFilter.search(inputValue, tagsList);
        recipesToDisplay = recipesFiltered;
      } else {
        this.searchFilter.search('', tagsList);
        recipesToDisplay = recipesFiltered;
      }

      display.displayRecipes($recipesWrapper, recipesToDisplay);
      display.displayMenuFilter($filtersWrapper, recipesToDisplay);
      display.displayCounter(recipesToDisplay);
    });
  }
}
const index = new Index();
index.main();
