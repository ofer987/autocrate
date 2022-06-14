import { Server } from "./server";

export class ServerMenuModel {
  private _selectedIndex: number;
  private servers: Server[];

  private set selectedIndex(value: number) {
    if (value < 0) {
      this._selectedIndex = this.servers.length - 1;
      return;
    }

    if (value > this.servers.length - 1) {
      this._selectedIndex = 0;
      return;
    }

    this._selectedIndex = value;
    return;
  }

  moveUp(): number {
    this.selectedIndex = this._selectedIndex + 1;

    return this._selectedIndex;
  }

  moveDown(): number {
    this.selectedIndex = this._selectedIndex - 1;

    return this._selectedIndex;
  }

  // setSelectedPage(id) {
  //   var selectedPage = this.menuElement.querySelector(`#${id}`);
  //
  //   selectedPage.classList.add("selected");
  // }
  //
  // get pageElements() {
  //   return this.menuElement.querySelectorAll('.page');
  // }
  //
  // get menuElement(): HTMLElement {
  //   return document.getElementById('pages');
  // }

  constructor(servers: Server[], selectedIndex?: number) {
    this.servers = servers;
    this._selectedIndex = selectedIndex || 0;
  }

  // moveUp() {
  //   var currentIndex = this.selectedIndex;
  //   var pageLength = this.pages.length;
  //
  //   // rollover
  //   if (currentIndex <= 0) {
  //     this.selectedIndex = this.pages.length - 1;
  //   } else {
  //     this.selectedIndex -= 1;
  //   }
  //
  //   this.render();
  // }
  //
  // moveDown() {
  //   var currentIndex = this.selectedIndex;
  //   var pageLength = this.pages.length;
  //
  //   // rollover
  //   if (currentIndex + 1 >= pageLength) {
  //     this.selectedIndex = 0;
  //   } else {
  //     this.selectedIndex += 1;
  //   }
  //
  //   this.render();
  // }

  // launch() {
  //   var selectedPage = this.pages[this.selectedIndex];
  //
  //   navigateTo(selectedPage.toString());
  // }
  //
  // close() {
  //   window.close();
  // }
  //
  // clear() {
  //   this.pageElements.forEach(function(page) {
  //     page.remove();
  //   });
  // }

  // render() {
  //   this.clear();
  //
  //   var menuElement = this.menuElement;
  //   this.pages.forEach(function(page) {
  //     var pageElement = getSelectionDiv(page.id, page.name, page.toString());
  //
  //     menuElement.appendChild(pageElement);
  //   });
  //
  //   this.setSelectedPage(this.pages[this.selectedIndex].id);
  // }
}

