export abstract class MenuViewModel {
  protected abstract IS_SELECTED_CLASS: string;
  protected abstract ITEM_CLASS: string;
  protected abstract MENU_CLASS: string;

  protected _selectedIndex = 0;

  protected abstract get menu(): HTMLElement;

  get isNull(): boolean {
    return false;
  }

  moveUp(): number {
    this.setSelectedIndex(this._selectedIndex - 1);

    return this._selectedIndex;
  }

  moveDown(): number {
    this.setSelectedIndex(this._selectedIndex + 1);

    return this._selectedIndex;
  }

  display(): void {
    this.menu?.classList.remove("hidden");
    this.menu?.classList.add("displayed");
    this.setSelectedElementByUrl();
  }

  hide(): void {
    this.menu?.classList.remove("displayed");
    this.menu?.classList.add("hidden");
  }

  abstract navigate(): void;

  protected navigateTo(url: URL): void {
    chrome.tabs.query({ active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        const currentUrl = tabs[0]?.url ?? "";
        chrome.tabs.update(tabs[0].id ?? 0, { url: url.toString() }, () => {
          chrome.history.addUrl({ url: currentUrl });
        });
      });
  }

  protected validate(): void {
    if (!this.menu) {
      throw "Could not find the menu element!";
    }
  }

  protected getElementById(id: string): HTMLElement {
    const element = document.getElementById(id);

    if (!element) {
      throw `Could not find element with id #${id}`;
    }

    return element;
  }

  protected abstract setSelectedElementByUrl(): void;

  protected abstract setSelectedIndex(value: number): void;
}
