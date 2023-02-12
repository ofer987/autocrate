export abstract class MenuViewModel {
  protected abstract IS_SELECTED_CLASS: string;
  protected abstract ITEM_CLASS: string;
  protected abstract MENU_CLASS: string;

  protected url: URL;
  protected _selectedIndex: number;
  protected menu: HTMLElement;

  get isNull(): boolean {
    return false;
  }

  moveUp(): number {
    this.setSelectedIndex(this._selectedIndex - 1)

    return this._selectedIndex;
  }

  moveDown(): number {
    this.setSelectedIndex(this._selectedIndex + 1);

    return this._selectedIndex;
  }

  display(): void {
    this.menu.classList.remove("hidden");
    this.menu.classList.add("displayed");
    this.setSelectedElementByUrl();
  }

  hide(): void {
    this.menu.classList.remove("displayed");
    this.menu.classList.add("hidden");
  }

  abstract navigate(): void;

  protected navigateTo(url: URL): void {
    chrome.tabs.query({ active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        let currentUrl = tabs[0].url;
        chrome.tabs.update(tabs[0].id, { url: url.toString() }, () => {
          chrome.history.addUrl({ url: currentUrl });
        });
      });
  };

  protected abstract setSelectedElementByUrl(): void;

  protected abstract setSelectedIndex(value: number): void;
}
