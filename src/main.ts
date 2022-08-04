import { AemPages } from "./pages/aemPages";
import { Servers, Server } from "./models/server";
import { ServerMenuViewModel } from "./viewModels/serverMenuViewModel";
import { PagesMenuViewModel } from "./viewModels/pageMenuViewModel";

const authorServers = {
  localhost: {
    name: "Localhost",
    url: new URL("http://localhost:4502")
  },
  dev: {
    name: "Dev",
    url: new URL("https://author-dev-ams.ewp.thomsonreuters.com/")
  },
  qa: {
    name: "QA",
    url: new URL("https://author-qa-ams.ewp.thomsonreuters.com/")
  },
  uat: {
    name: "UAT",
    url: new URL("https://author-uat-ams.ewp.thomsonreuters.com/")
  },
  ppe: {
    name: "PPE",
    url: new URL("https://author-ppe-ams.ewp.thomsonreuters.com/")
  },
  production: {
    name: "Production",
    url: new URL("https://author-prod-ams.ewp.thomsonreuters.com/")
  }
};

const publisherServers = {
  qa_publisher_1: {
    name: "QA Publish",
    url: new URL("http://publish1useast1-as.qa.ewp.thomsonreuters.com:4503"),
  },
  uat_publisher_1: {
    name: "UAT Publish",
    url: new URL("http://publish1useast1-as.uat.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_1: {
    name: "PPE Publish 1 US EAST 1",
    url: new URL("http://publish1useast1-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_2: {
    name: "PPE Publish 2 US EAST 1",
    url: new URL("http://publish2useast1-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_3: {
    name: "PPE Publish 1 US WEST 1",
    url: new URL("http://publish1uswest1-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_4: {
    name: "PPE Publish 1 US WEST 2",
    url: new URL("http://publish2uswest2-as.ppe.ewp.thomsonreuters.com:4503"),
  },
}

const defaultMode = "servers";
type modes = "servers" | "pages";

export class Main {
  private NEW_TAB = "chrome://newtab/";

  private mode: modes;
  private servers: Servers;
  private serversMenu: ServerMenuViewModel;
  private pagesMenu: PagesMenuViewModel;

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
      authors: [],
      publishers: [],
    };

    chrome.storage.sync.get(null, (savedValues: Servers) => {
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

      this.serversMenu = new ServerMenuViewModel(url, this.authorServers, this.publisherServers);

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
