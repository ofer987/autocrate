import { MenuViewModel } from "./menuViewModel";
import { AemPage, aemPageTypes } from "../pages/aemPage";

interface Page {
  isEnabled: boolean;
  name: string;
  aemPageType: aemPageTypes;
  url: URL;
}

export class PagesMenuViewModel extends MenuViewModel {
  protected IS_SELECTED_CLASS = "selected";
  private IS_DISABLED_CLASS = "disabled-page";
  protected ITEM_CLASS = "page";
  protected MENU_CLASS = "pages";

  private currentAemPage: AemPage;
  private pages: Page[];
  private isActive: boolean;

  protected get selectedElementId() {
    return this.getElementId(this._selectedIndex);
  }

  constructor(currentAemPage: AemPage) {
    super();

    this.currentAemPage = currentAemPage;
    this.pages = this
      .getPageTypes()
      .map((pageType: aemPageTypes) => {
        const aemPage = this.currentAemPage.switchAemPage(pageType)

        return {
          isEnabled: aemPage.isEnabled,
          name: pageType,
          aemPageType: pageType,
          url: aemPage.url
        }
      });

    this.menu = document.getElementById(this.MENU_CLASS);
    this.init();
  }

  private init(): void {
    let index = 0;

    this.pages
      .map((page: Page) => {
        return this.createItem(page.isEnabled, index++, page.name, page.url);
      }).forEach((item: HTMLElement) => {
        this.menu.appendChild(item);
      });

    this.onKeyDown();
  }

  navigate(): void {
    const page = this.pages[this._selectedIndex];
    if (!page.isEnabled) {
      return;
    }

    this.navigateTo(page.url);
  }

  display(): void {
    this.activate();

    this.menu.classList.remove("hidden");
    this.menu.classList.add("displayed");
    this.setSelectedElementByUrl();
  }

  hide(): void {
    this.deactivate();

    const page = this.pages[this._selectedIndex];
    if (!page.isEnabled) {
      return;
    }

    this.menu.classList.remove("displayed");
    this.menu.classList.add("hidden");
  }

  private createItem(isEnabled: boolean, id: number, name: string, url: URL): HTMLDivElement {
    let result = document.createElement('div');

    const elementId = this.getElementId(id);
    result.id = elementId;
    result.textContent = name;
    if (!isEnabled) {
      result.classList.add(this.IS_DISABLED_CLASS);
    } else {
      result.className = this.ITEM_CLASS;
    }

    result.onclick = () => {
      if (!isEnabled) {
        return;
      }

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

      if (page.aemPageType === this.currentAemPage.getType) {
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

  private activate(): void {
    this.isActive = true;
  }

  private deactivate(): void {
    this.isActive = false;
  }

  private onKeyDown(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (!this.isActive) {
        return;
      }

      if (this.pages.filter(page => page.isEnabled).length === 0) {
        return;
      }

      event.preventDefault();

      if (event.key === "j" || event.key === "ArrowDown") {
        do {
          this.moveDown();
        } while (!this.pages[this._selectedIndex].isEnabled)
      }

      if (event.key === "k" || event.key === "ArrowUp") {
        do {
          this.moveUp();
        } while (!this.pages[this._selectedIndex].isEnabled)
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

  private getPageTypes(): aemPageTypes[] {
    return [
      "Login",
      "Start",
      "Editor",
      "Preview",
      "CRX / DE JCR Manager",
      "CRX / DE Package Manager",
      "User Admin",
      "Sites",
      "Console",
    ]
  }
}
