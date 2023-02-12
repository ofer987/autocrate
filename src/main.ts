import { AemPages } from "./pages/aemPages";
import { Servers, Server } from "./models/server";
import { ServerMenuViewModel } from "./viewModels/serverMenuViewModel";
import { PagesMenuViewModel } from "./viewModels/pageMenuViewModel";

const defaultMode = "servers";
type modes = "servers" | "pages";

export class Main {
  private NEW_TAB = "chrome://newtab/";

  private mode: modes;
  private servers: Servers;
  private serversMenu: ServerMenuViewModel;
  private pagesMenu: PagesMenuViewModel;

  private get authorDispatcherServers(): Server[] {
    return this.servers.authorDispatchers;
  }

  private get authorServers(): Server[] {
    return this.servers.authors;
  }

  private get publisherServers(): Server[] {
    return this.servers.publishers;
  }

  constructor() {
    this.mode = defaultMode;

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

      this.serversMenu = new ServerMenuViewModel(url, this.authorDispatcherServers, this.authorServers, this.publisherServers);

      const aemPage = AemPages.getAemPage(url)
      this.pagesMenu = new PagesMenuViewModel(aemPage);

      if (url.toString() === this.NEW_TAB) {
        this.mode = "servers";
      } else {
        this.mode = "pages";
      }

      this.displayMenu();
    });

    chrome.commands.onCommand.addListener((command: string) => {
      if (command === "select" && !this.pagesMenu.isNull) {
        this.mode = this.mode == "servers"
          ? "pages"
          : "servers";
      }

      this.displayMenu();
    });
  }

  // Display the selected menu
  private displayMenu() {
    if (this.mode === "servers") {
      this.serversMenu.display();
      this.pagesMenu.hide();
    } else {
      this.serversMenu.hide();
      this.pagesMenu.display();
    }
  }
}
