export abstract class MenuViewModel {
  protected abstract IS_SELECTED_CLASS: string;
  protected abstract SERVER_CLASS: string;

  protected url: URL;
  protected _selectedIndex: number;
  // private servers: Server[];
  protected menu: HTMLElement;

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
    this.setSelectedElementByUrl(this.url);
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

  protected abstract setSelectedElementByUrl(url: URL): void;

  protected abstract setSelectedIndex(value: number): void;

  // TODO: maybe this should be a protected function?
  // private onKeyDown(): void {
  //   document.addEventListener("keydown", (event: KeyboardEvent) => {
  //     event.preventDefault();
  //
  //     if (event.key === "j" || event.key === "ArrowDown") {
  //       this.moveDown();
  //     }
  //
  //     if (event.key === "k" || event.key === "ArrowUp") {
  //       this.moveUp();
  //     }
  //
  //     if (event.key === "o" || event.key === "Enter") {
  //       this.navigate();
  //       this.hide();
  //
  //       window.close();
  //     }
  //
  //     if (event.key === "Escape") {
  //       this.hide();
  //
  //       window.close();
  //     }
  //   });
  // }
}

