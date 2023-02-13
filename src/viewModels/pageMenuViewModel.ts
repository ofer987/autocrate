import { MenuViewModel } from "./menuViewModel";
import { AemPage } from "../pages/aemPage";
import { AemPages } from "../pages/aemPages";
import { aemPageTypes } from "../pages/pageType";

interface Page {
  isEnabled: boolean;
  name: string;
  aemPageType: aemPageTypes;
  url: URL;
}

export class PagesMenuViewModel extends MenuViewModel {
  protected IS_SELECTED_CLASS = "selected";
  protected ITEM_CLASS = "page";
  protected MENU_CLASS = "pages";
  private IS_DISABLED_CLASS = "disabled-page";

  private currentAemPage: AemPage;
  private pages: Page[];
  private isActive = false;

  private _menu: HTMLElement;

  protected get menu(): HTMLElement {
    return this._menu;
  }

  protected get selectedElementId() {
    return this.getElementId(this._selectedIndex);
  }

  constructor(currentAemPage: AemPage) {
    super();

    this.currentAemPage = currentAemPage;
    this.pages = this
      .getPageTypes()
      .map((pageType: aemPageTypes) => {
        const pageType2 = this.currentAemPage.switchAemPage(pageType);
        const aemPage = AemPages.createAemPage(pageType2.pageType, pageType2.url);

        return {
          isEnabled: aemPage.isEnabled,
          name: pageType,
          aemPageType: pageType,
          url: aemPage.url
        };
      });

    this._menu = this.getElementById(this.MENU_CLASS);
    this.init();
    this.validate();
  }

  private init(): void {
    let index = 0;

    this.pages
      .map((page: Page) => {
        return this.createItem(page.isEnabled, index++, page.name, page.url);
      }).forEach((item: HTMLElement) => {
        this.menu?.appendChild(item);
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

    this.menu?.classList.remove("hidden");
    this.menu?.classList.add("displayed");
    this.setSelectedElementByUrl();
  }

  hide(): void {
    this.deactivate();

    this.menu?.classList.remove("displayed");
    this.menu?.classList.add("hidden");
  }

  private createItem(isEnabled: boolean, id: number, name: string, url: URL): HTMLDivElement {
    const result = document.createElement('div');

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
  }

  protected setSelectedIndex(value: number) {
    const pages = document.querySelectorAll(`.${this.ITEM_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    if (value < 0) {
      value = this.pages.length - 1;
    }

    if (value > this.pages.length - 1) {
      value = 0;
    }

    this._selectedIndex = value;

    const selectedElement = this.getElementById(this.getElementId(value));
    selectedElement.classList.add(this.IS_SELECTED_CLASS);
  }

  protected navigateTo(url: URL): void {
    chrome.tabs.query({ active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        const currentUrl = tabs[0].url ?? "";
        chrome.tabs.update(tabs[0]?.id ?? 0, { url: url.toString() }, () => {
          chrome.history.addUrl({ url: currentUrl });
        });
      });
  }

  protected setSelectedElementByUrl() {
    const pages = document.querySelectorAll(`.${this.ITEM_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    for (let index = 0; index < this.pages.length; index += 1) {
      const page = this.pages[index];

      if (page.aemPageType === this.currentAemPage.getType) {
        this._selectedIndex = index;
        const elementId = this.getElementId(this._selectedIndex);
        this.getElementById(elementId).classList.add(this.IS_SELECTED_CLASS);

        return;
      }
    }

    // This is not an AEM page, so
    // set to first Server
    this._selectedIndex = 0;
    const elementId = this.getElementId(0);
    this.getElementById(elementId).classList.add(this.IS_SELECTED_CLASS);
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
        } while (!this.pages[this._selectedIndex].isEnabled);
      }

      if (event.key === "k" || event.key === "ArrowUp") {
        do {
          this.moveUp();
        } while (!this.pages[this._selectedIndex].isEnabled);
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
      "Welcome"
    ];
  }
}
