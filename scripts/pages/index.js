import { Header } from '../templates/Header.js';
import { Main } from '../templates/Main.js';
class Index {
  constructor() {
    this.$headerWrapper = document.getElementById('header_wrapper');
    this.$mainContent = document.getElementById('main_content');
  }
  main() {
    const headerTemplate = new Header();
    const headerHtml = headerTemplate.createHeader();
    this.$headerWrapper.innerHTML = headerHtml;
    this.addMainContent();
  }
  async addMainContent() {
    const mainTemplate = new Main();
    const { $filterWrapper, $recipesWrapper } = await mainTemplate.createMain();
    this.$mainContent.appendChild($filterWrapper);
    this.$mainContent.appendChild($recipesWrapper);
  }
}
const index = new Index();
index.main();
