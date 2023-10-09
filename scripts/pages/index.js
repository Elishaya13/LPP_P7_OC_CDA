import { Header } from '../templates/Header.js';
class Index {
  constructor() {
    this.$headerWrapper = document.getElementById('header_wrapper');
    this.$mainContent = document.getElementById('main_content');
  }
  main() {
    const headerTemplate = new Header();
    const headerHtml = headerTemplate.createHeader();
    this.$headerWrapper.innerHTML = headerHtml;
  }
}
const index = new Index();
index.main();
