import { AemPages } from "./pages/aemPages";
import { Options } from "./models/options";
import { Server } from "./models/server";
import { PagesMenuViewModel } from "./viewModels/pageMenuViewModel";
import { ServerMenuViewModel } from "./viewModels/serverMenuViewModel";

var defaultValues = {
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

// var getServers = function(url) {
//   url = new URL(url);
//
//   var results = [];
//   Object.keys(servers).forEach(function(name) {
//     var server = servers[name];
//     var serverUrl = new URL(url);
//
//     serverUrl.protocol = server.protocol;
//     serverUrl.host = server.host;
//
//     results.push(new Server(server.id, server.name, serverUrl));
//   });
//
//   return results;
// }

// class Keyboard {
//   addEventListeners(menu) {
//     this.addMoveUp(menu);
//     this.addMoveDown(menu);
//     this.addLaunch(menu);
//   }
//
//   addMoveUp(menu) {
//     document.addEventListener('keydown', function(event) {
//       if (event.keyCode === 38 || event.keyCode === 75) {
//         menu.moveUp();
//       }
//     });
//   }
//
//   addMoveDown(menu) {
//     document.addEventListener('keydown', function(event) {
//       if (event.keyCode === 40 || event.keyCode === 74) {
//         menu.moveDown();
//       }
//     });
//   }
//
//   addLaunch(menu) {
//     document.addEventListener('keydown', function(event) {
//       if (event.keyCode === 13 || event.keyCode == 79) {
//         menu.launch();
//         menu.close();
//       }
//     })
//   }
// }

// class AemPageState {
//   constructor(mode) {
//     this.mode = mode;
//     this.selectedIndex = 0;
//     this.pages = [];
//   }
//
//   appendPage(page) {
//     this.pages.push(page);
//   }
// }

// var navigateTo = function(url) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     var currentUrl = tabs[0].url;
//     chrome.tabs.update(tabs[0].id, { url: url }, () => {
//       chrome.history.addUrl({ url: currentUrl });
//     });
//   });
// };

// var getPages = function(page) {
//   return [
//     page.editorPage,
//     page.previewPage,
//     page.crxDePage,
//     page.crxPackMgrPage,
//     page.sitesPage,
//     page.userAdminPage
//   ];
// };

// var getSelectionDiv = function(id, name, url) {
//   var result = document.createElement('div');
//   result.id = id;
//   result.className = 'page';
//   result.textContent = name;
//   result.onclick = function() {
//     navigateTo(url);
//   };
//
//   return result;
// };

var appendError = function(exception: Error) {
  var newError = document.createElement('div');
  newError.className = 'error';
  newError.textContent = exception.toString();

  var errorsDiv = document.getElementById('errors');
  errorsDiv.appendChild(newError);

  return;
};

// var createPagesMenu = function(url) {
//   var currentPage = AemPage.getPage(url);
//   var state = new AemPageState("pages");
//
//   var i = 0;
//   var currentIndex = 0;
//   getPages(currentPage).forEach(function(page) {
//     if (currentPage.id === page.id) {
//       currentIndex = i;
//     } else {
//       i += 1;
//     }
//
//     state.appendPage(page);
//   });
//
//   var menu = new Menu(currentIndex, state.pages);
//   var keyboard = new Keyboard();
//   keyboard.addEventListeners(menu);
//
//   return menu;
// };

// var createServersMenu = function(url) {
//   var currentUrl = new URL(AemPage.getPage(url));
//   var state = new AemPageState("pages");
//
//   var i = 0;
//   var currentIndex = 0;
//   getServers(currentUrl).forEach(function(server) {
//     if (server.url.origin === currentUrl.origin) {
//       currentIndex = i;
//     } else {
//       i += 1;
//     }
//
//     state.appendPage(server);
//   });
//
//   var menu = new Menu(currentIndex, state.pages);
//   var keyboard = new Keyboard();
//   keyboard.addEventListeners(menu);
//
//   return menu;
// };

// var createCrxDePagesMenu = (options: Options) {
//   var state = new AemPageState("pages");
//
//   getCrxDePages(Object.keys(options)).forEach((key: string) => {
//     var server = options[key];
//     // console.log(page.toString());
//     state.appendPage(server);
//   });
//
//   var menu = new Menu(0, state.pages);
//   var keyboard = new Keyboard();
//   keyboard.addEventListeners(menu);
//
//   return menu;
// };

const defaultMode = "servers";
type modes = "servers" | "pages";

export class Main {
  private mode: modes;
  private servers: Server[];
  private serversMenu: ServerMenuViewModel;
  private pagesMenu: PagesMenuViewModel | null;

  constructor() {
    this.mode = defaultMode;

    this.init();
  }

// TODO: Convert to async/await
  init(_andThen?: any) {
    // TODO: add await
    var options = { ...defaultValues }
    // var options = {
    //   localhost: ,
    //   qa: "",
    //   uat: "",
    //   ppe: "",
    //   production: ""
    // };

    // chrome.storage.sync.get(options, (saved_values: Options) => {
    //   options = saved_values;
    //   // defaultValues.localhost.url = saved_values.localhost;
    //   // servers.qa.host = saved_values.qa;
    //   // servers.uat.host = saved_values.uat;
    //   // servers.ppe.host = saved_values.ppe;
    //   // servers.production.host = saved_values.production;
    //
    //   andThen();
    // });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      var tab = tabs[0];
      var url = new URL(tab.url);

      this.servers = Object.values(options) as Server[];
      this.serversMenu = new ServerMenuViewModel(url, this.servers);
      this.pagesMenu = null;
      try {
        const aemPage = AemPages.getAemPage(url)

        // alert("everything is fine");
        this.pagesMenu = new PagesMenuViewModel(aemPage);
      } catch(exception) {
        alert(`Error: ${exception}`);
        alert(`is not an aem page url is ${url} ${this.pagesMenu}`);
        // not an AEM Page so do nothing and the AEM Pages Menu
        // won't display
      }

      chrome.commands.onCommand.addListener((command: string) => {
        // alert(`hello ${this.mode}`);
        if (command === "select" && this.pagesMenu !== null) {
          // alert(`2. hello ${this.mode}`);
          this.mode = this.mode == "servers"
            ? "pages"
            : "servers";
        }

        this.displayMenu();
      });

      this.displayMenu();
    });
  }

  // display(options: Options): void {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
  //     var tab = tabs[0];
  //     var url = new URL(tab.url);
  //
  //     let servers = Object.values(options) as Server[];
  //     let serversMenu = new ServerMenuViewModel(url, servers);
  //     let pagesMenu = null;
  //     try {
  //       const aemPage = AemPages.getAemPage(url)
  //
  //       // alert("everything is fine");
  //       pagesMenu = new PagesMenuViewModel(aemPage);
  //     } catch(exception) {
  //       alert(`Error: ${exception}`);
  //       alert(`is not an aem page url is ${url} ${pagesMenu}`);
  //       // not an AEM Page so do nothing and the AEM Pages Menu
  //       // won't display
  //     }
  //
  //     chrome.commands.onCommand.addListener((command: string) => {
  //       // alert(`hello ${this.mode}`);
  //       if (command === "select" && pagesMenu !== null) {
  //         alert(`2. hello ${this.mode}`);
  //         this.mode = this.mode == "servers"
  //           ? "pages"
  //           : "servers";
  //       }
  //
  //     });
  //
  //     // if (this.mode === "servers") {
  //     //   serversMenu.display();
  //     //   pagesMenu.hide();
  //     // } else {
  //     //   serversMenu.hide();
  //     //   pagesMenu.display();
  //     // }
  //   });
  // }

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

// Initalize the popup window.
// document.addEventListener('DOMContentLoaded', () => {
//   initialize(main);
// });
