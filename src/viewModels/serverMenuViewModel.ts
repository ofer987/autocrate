import { Server } from "../models/server";

export class ServerMenuViewModel {
  private IS_SELECTED_CLASS = "selected";
  private ITEM_CLASS = "server";
  private MENU_CLASS = "servers";

  private url: URL;
  private _selectedIndex: number;
  private servers: Server[];

  private get selectedElementId() {
    return this.getServerElementId(this._selectedIndex);
  }

  private setSelectedIndex(value: number) {
    let pages = document.querySelectorAll(`.${this.ITEM_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    if (value < 0) {
      value = this.servers.length - 1;
    }

    if (value > this.servers.length - 1) {
      value = 0;
    }

    const selectedServerElementId = this.getServerElementId(value);

    this._selectedIndex = value;

    document.getElementById(selectedServerElementId).classList
      .add(this.IS_SELECTED_CLASS);
  }

  private menu: HTMLElement;

  constructor(currentUrl: URL, servers: Server[], selectedIndex?: number) {
    this.url = currentUrl;
    this.servers = servers;
    this._selectedIndex = selectedIndex || 0;

    this.menu = document.getElementById(this.MENU_CLASS);
    this.init();
  }

  private init(): void {
    let index = 0;

    this.servers.map((server: Server) => {
      return this.createItem(index++, server.name, server.url);
    }).forEach((item: HTMLElement) => {
      this.menu.appendChild(item);
    });

    this.onKeyDown();
  }

  moveUp(): number {
    this.setSelectedIndex(this._selectedIndex - 1)

    return this._selectedIndex;
  }

  moveDown(): number {
    this.setSelectedIndex(this._selectedIndex + 1);

    return this._selectedIndex;
  }

  navigate(): void {
    this.navigateTo(this.servers[this._selectedIndex].url);
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

    const elementId = this.getServerElementId(id);
    result.id = elementId;
    result.textContent = name;
    result.className = this.ITEM_CLASS;

    result.onclick = () => {
      this.navigateTo(url);
    };

    return result;
  };

  private getServerElementId(id: number): string {
    return `server-${id}`;
  }

  private navigateTo(url: URL): void {
    chrome.tabs.query({ active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        let currentUrl = tabs[0].url;
        chrome.tabs.update(tabs[0].id, { url: url.toString() }, () => {
          chrome.history.addUrl({ url: currentUrl });
        });
      });
  };

  private setSelectedElementByUrl(url: URL) {
    let pages = document.querySelectorAll(`.${this.ITEM_CLASS}`);
    pages.forEach(item => item.classList.remove(this.IS_SELECTED_CLASS));

    for (let index = 0; index < this.servers.length; index += 1) {
      let server = this.servers[index];

      if (server.url.origin === url.origin) {
        this._selectedIndex = index;
        const elementId = this.getServerElementId(this._selectedIndex);
        document.getElementById(elementId).classList
          .add(this.IS_SELECTED_CLASS);

        return;
      }
    }

    // This is not an AEM page, so
    // set to first Server
    this._selectedIndex = 0;
    const elementId = this.getServerElementId(0);
    document.getElementById(elementId).classList
      .add(this.IS_SELECTED_CLASS);
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

