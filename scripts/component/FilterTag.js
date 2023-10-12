export class Filtertag {
  constructor(value) {
    this.name = value;
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
    return $tagElement;
  }
}
