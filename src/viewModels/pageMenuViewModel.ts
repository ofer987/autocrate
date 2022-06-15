import { MenuViewModel } from "./menuViewModel";
import { AemPage } from "../pages/aemPage";
import { AemPages } from "../pages/aemPages";

export class PagesMenuViewModel extends MenuViewModel {
  protected IS_SELECTED_CLASS = "selected";
  protected SERVER_CLASS = "page";

  private pages: string[];

  protected get selectedElementId() {
    return this.getElementId(this._selectedIndex);
  }

  constructor(currentUrl: URL, selectedIndex?: number) {
    super();

    this.url = currentUrl;
    this.pages = AemPages.getPageNames();
    this._selectedIndex = selectedIndex || 0;

    this.menu = document.getElementById("pages");
    this.init();
  }

  private init(): void {
    let index = 0;

    this.pages.map((page: AemPage) => {
      return this.createItem(index++, page.name, page.url);
    }).forEach((item: HTMLElement) => {
      this.menu.appendChild(item);
    });

    this.onKeyDown();
  }

  navigate(): void {
    this.nprivateavigateTo(this.pages[this._selectedIndex].url);
  }

  display(): void {
    this.menu.classList.remove("hidden");
    this.menu.classList.add("displayed");
    this.setSelectedElementByUrl(this.url);
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
    result.className = this.SERVER_CLASS;

    result.onclick = () => {
      this.navigateTo(url);
    };

    return result;
  };

  protected setSelectedIndex(value: number) {
    let pages = document.querySelectorAll(`.${this.SERVER_CLASS}`);
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

  protected setSelectedElementByUrl(url: URL) {
    let pages = document.querySelectorAll(`.${this.SERVER_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    for (let index = 0; index < this.pages.length; index += 1) {
      let page = this.pages[index];

      if (page.url.origin === url.origin) {
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
}
