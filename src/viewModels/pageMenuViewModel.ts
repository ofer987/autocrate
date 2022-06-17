import { kebabCase } from "lodash";

import { MenuViewModel } from "./menuViewModel";
import { AemPage, aemPageTypes } from "../pages/aemPage";

interface Page {
  id: string;
  name: string;
  aemPage: AemPage;
  url: URL;
}

export class PagesMenuViewModel extends MenuViewModel {
  protected IS_SELECTED_CLASS = "selected";
  protected ITEM_CLASS = "page";
  protected MENU_CLASS = "pages";

  private currentAemPage: AemPage;
  private pages: Page[];

  protected get selectedElementId() {
    return this.getElementId(this._selectedIndex);
  }

  constructor(currentAemPage: AemPage) {
    super();

    // this.url = currentUrl;
    // alert("1");
    // alert(`the current page is ${currentAemPage}`);
    // alert(`the current page type is ${currentAemPage.getType}`);
    this.currentAemPage = currentAemPage;
    // alert(`1.5 the current page is ${this.currentAemPage}`);
    // alert(`1.5 the current page type is ${this.currentAemPage.getType}`);
    this.pages = AemPage
      .getPageTypes()
      .map((pageType: aemPageTypes) => {
        const aemPage = this.currentAemPage.switchAemPage(pageType)

        return {
          id: kebabCase(pageType),
          name: pageType,
          aemPage: aemPage,
          url: aemPage.url
        }
      });
    // this._selectedIndex = selectedIndex || 0;

    // alert("2");
    this.menu = document.getElementById(this.MENU_CLASS);
    this.init();
  }

  private init(): void {
    let index = 0;

    this.pages
      .map((page: Page) => {
        return this.createItem(index++, page.name, page.url);
      }).forEach((item: HTMLElement) => {
        this.menu.appendChild(item);
      });

    // alert(`Created ${index} pages`);

    this.onKeyDown();
  }

  navigate(): void {
    this.navigateTo(this.pages[this._selectedIndex].url);
  }

  display(): void {
    this.menu.classList.remove("hidden");
    this.menu.classList.add("displayed");
    // alert("pages menu is displayed!");
    this.setSelectedElementByUrl();
  }

  hide(): void {
    this.menu.classList.remove("displayed");
    this.menu.classList.add("hidden");
  }

  private createItem(id: number, name: string, url: URL): HTMLDivElement {
    let result = document.createElement('div');

    const elementId = this.getElementId(id);
    result.id = elementId;
    result.textContent = name;
    result.className = this.ITEM_CLASS;

    result.onclick = () => {
      this.navigateTo(url);
    };

    return result;
  };

  protected setSelectedIndex(value: number) {
    let pages = document.querySelectorAll(`.${this.ITEM_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    if (value < 0) {
      value = this.pages.length - 1;
    }

    if (value > this.pages.length - 1) {
      value = 0;
    }

    const selectedElementId = this.getElementId(value);

    this._selectedIndex = value;

    document.getElementById(selectedElementId).classList
      .add(this.IS_SELECTED_CLASS);
  }

  protected navigateTo(url: URL): void {
    chrome.tabs.query({ active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        let currentUrl = tabs[0].url;
        chrome.tabs.update(tabs[0].id, { url: url.toString() }, () => {
          chrome.history.addUrl({ url: currentUrl });
        });
      });
  };

  protected setSelectedElementByUrl() {
    let pages = document.querySelectorAll(`.${this.ITEM_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    for (let index = 0; index < this.pages.length; index += 1) {
      let page = this.pages[index];

      if (page.aemPage.getType === this.currentAemPage.getType) {
        this._selectedIndex = index;
        const elementId = this.getElementId(this._selectedIndex);
        document.getElementById(elementId).classList
          .add(this.IS_SELECTED_CLASS);

        return;
      }
    }

    // This is not an AEM page, so
    // set to first Server
    this._selectedIndex = 0;
    const elementId = this.getElementId(0);
    document.getElementById(elementId).classList
      .add(this.IS_SELECTED_CLASS);
  }

  private getElementId(id: number): string {
    return `page-${id}`;
  }

  private onKeyDown(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.key === "j" || event.key === "ArrowDown") {
        this.moveDown();
      }

      if (event.key === "k" || event.key === "ArrowUp") {
        this.moveUp();
      }

      if (event.key === "o" || event.key === "Enter") {
        this.navigate();
        this.hide();

        window.close();
      }

      if (event.key === "Escape") {
        this.hide();

        window.close();
      }
    });
  }

  // private toPage(name: aemPageTypes): Page {
  //   alert(`the current page is ${this.currentAemPage}`);
  //   alert(`I am currently on the ${this.currentAemPage.getType.toString()} page`);
  //   alert(`1.5 name is ${name}`);
  //   const aemPage = this.currentAemPage.switchAemPage(name)
  //
  //   return {
  //     id: kebabCase(name),
  //     name: name,
  //     aemPage: aemPage,
  //     url: aemPage.url
  //   }
  // }
}
