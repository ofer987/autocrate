export class Menu {
  setSelectedPage(id) {
    var selectedPage = this.menuElement.querySelector(`#${id}`);

    selectedPage.classList.add("selected");
  }

  get pageElements() {
    return this.menuElement.querySelectorAll('.page');
  }

  get menuElement(): HTMLElement {
    return document.getElementById('pages');
  }

  constructor(selectedIndex, pages) {
    this.pages = pages;
    this.selectedIndex = selectedIndex;
  }

  moveUp() {
    var currentIndex = this.selectedIndex;
    var pageLength = this.pages.length;

    // rollover
    if (currentIndex <= 0) {
      this.selectedIndex = this.pages.length - 1;
    } else {
      this.selectedIndex -= 1;
    }

    this.render();
  }

  moveDown() {
    var currentIndex = this.selectedIndex;
    var pageLength = this.pages.length;

    // rollover
    if (currentIndex + 1 >= pageLength) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }

    this.render();
  }

  launch() {
    var selectedPage = this.pages[this.selectedIndex];

    navigateTo(selectedPage.toString());
  }

  close() {
    window.close();
  }

  clear() {
    this.pageElements.forEach(function(page) {
      page.remove();
    });
  }

  render() {
    this.clear();

    var menuElement = this.menuElement;
    this.pages.forEach(function(page) {
      var pageElement = getSelectionDiv(page.id, page.name, page.toString());

      menuElement.appendChild(pageElement);
    });

    this.setSelectedPage(this.pages[this.selectedIndex].id);
  }
}

