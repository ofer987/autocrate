import { AemPages } from "./pages/aemPages";
import { Servers, Server } from "./models/server";
import { MenuViewModel } from "./viewModels/menuViewModel";
import { ServerMenuViewModel } from "./viewModels/serverMenuViewModel";
import { PagesMenuViewModel } from "./viewModels/pageMenuViewModel";

export class Main {
  private servers: Servers;
  private serverMenus: ServerMenuViewModel[] = [];
  private pagesMenu: PagesMenuViewModel;
  private menuIndex: number = 0;

  private get currentMenu(): MenuViewModel {
    return this.menus[this.menuIndex];
  }

  private get authorDispatcherServers(): Server[] {
    return this.servers.authorDispatchers;
  }

  private get authorServers(): Server[] {
    return this.servers.authors;
  }

  private get publisherServers(): Server[] {
    return this.servers.publishers;
  }

  private get menus(): MenuViewModel[] {
    const results = [];

    results.push(this.pagesMenu);
    this.serverMenus.forEach(item => results.push(item));

    return results;
  }

  constructor() {
    this.restoreOptionsAndInit();
  }

  private restoreOptionsAndInit(): void {
    this.servers = {
      authorDispatchers: [],
      authors: [],
      publishers: [],
    };

    chrome.storage.sync.get(null, (savedValues: Servers) => {
      savedValues.authorDispatchers.forEach((saved_value: Server) => {
        this.servers.authorDispatchers.push(saved_value);
      });

      savedValues.authors.forEach((saved_value: Server) => {
        this.servers.authors.push(saved_value);
      });

      savedValues.publishers.forEach((saved_value: Server) => {
        this.servers.publishers.push(saved_value);
      });

      this.init();
    });
  }

  private init() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      var tab = tabs[0];
      var url = new URL(tab.url);

      this.serverMenus.push(new ServerMenuViewModel(url, this.authorDispatcherServers, "author-dispatchers"));
      this.serverMenus.push(new ServerMenuViewModel(url, this.authorServers, "authors"));
      this.serverMenus.push(new ServerMenuViewModel(url, this.publisherServers, "publishers"));

      const aemPage = AemPages.getAemPage(url)
      this.pagesMenu = new PagesMenuViewModel(aemPage);

      if (aemPage.isAemPage) {
        this.displayPageMenu();
      } else {
        this.displayServerMenu();
      }
    });

    chrome.commands.onCommand.addListener((command: string) => {
      if (command === "select") {
        this.rotateMenu();
      }
    });
  }

  private rotateMenu(): void {
    const menus = this.menus;
    const menuCount = menus.length;

    if (this.menuIndex + 1 < menuCount) {
      this.menuIndex += 1;
    } else {
      this.menuIndex = 0;
    }

    this.displayMenu();
  }

  private displayPageMenu(): void {
    this.menuIndex = 0;

    this.serverMenus.forEach(item => item.hide());
    this.currentMenu.display();
  }

  private displayServerMenu(): void {
    if (this.serverMenus.length === 0) {
      this.displayPageMenu();

      return;
    }

    this.menuIndex = 1;

    this.menus.forEach(item => item.hide());
    this.serverMenus[0].display();
  }

  // Display the selected menu
  private displayMenu() {
    this.menus.forEach(item => item.hide());
    this.currentMenu.display();
  }
}
