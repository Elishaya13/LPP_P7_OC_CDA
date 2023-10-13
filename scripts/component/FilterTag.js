export class Filtertag {
  constructor(value) {
    this.name = value;
  }

  handleRemoveTag($tagElement) {
    const $selectedItems = document.querySelectorAll('.selected');
    $selectedItems.forEach(($selected) => {
      if ($selected.textContent === this.name) {
        $selected.classList.remove('selected');

        const $iconToRemove = $selected.querySelector('i');
        if ($iconToRemove) {
          $iconToRemove.remove();
        }
      }
    });
    $tagElement.remove();
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

    $icon.addEventListener('click', () => {
      this.handleRemoveTag($tagElement);
    });
    return $tagElement;
  }
}
