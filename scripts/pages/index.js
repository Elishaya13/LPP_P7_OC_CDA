import { Header } from '../templates/Header.js';
import { Main } from '../templates/Main.js';
import { fetchData } from '../utils/fetch.js';
import { Search } from '../utils/search.js';

let recipesData = null;

class Index {
  constructor() {
    this.$headerWrapper = document.getElementById('header_wrapper');
    this.$mainContent = document.getElementById('main_content');
  }
  async main() {
    const headerTemplate = new Header();
    const headerHtml = headerTemplate.createHeader();
    this.$headerWrapper.innerHTML = headerHtml;

    if (!recipesData) {
      try {
        recipesData = await fetchData();
      } catch (error) {
        console.log('Fetch data Error : ', error);
      }
    }

    this.addMainContent();
  }
  async addMainContent() {
    const mainTemplate = new Main();
    const { $filterWrapper, $recipesWrapper } = await mainTemplate.createMain();
    this.$mainContent.appendChild($filterWrapper);
    this.$mainContent.appendChild($recipesWrapper);

    const search = new Search(recipesData);
    const $searchInput = document.getElementById('search');
    $searchInput.addEventListener('input', () => {
      const inputValue = $searchInput.value;
      if (inputValue.length >= 3) {
        search.searchRecipe(inputValue);
      } else {
        search.searchRecipe('');
      }
    });
  }
}
const index = new Index();
index.main();
