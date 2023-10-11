export class Header {
  constructor() {}

  createHeader() {
    const $header = `
  
          <div class="header__logo">
              <img src="../assets/images/logo.png" alt="logo">
          </div>
          <div class="header__content"> 
            <h2>
              CHERCHEZ PARMI PLUS DE 1500 RECETTES <br>
              DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
            </h2>
            <div class="header__searchbar">
              <form>
                <label for="search"></label>
                <div class="input__wrapper">
                  <input id="search" type="search" placeholder="Rechercher une recette, un ingrédient, ...">
                  <button type="submit">Search</button>
                </div>
              </form>
            </div>
          </div>
       
  `;

    return $header;
  }
}
