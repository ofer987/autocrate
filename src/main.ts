import { AemPages } from "./pages/aemPages";
import { Server } from "./server";

var defaultValues = {  
  localhost: {
    name: "Localhost",
    url: "http://localhost:4502"
  },
  dev: {
    name: "Dev",
    url: "https://author-dev-ams.ewp.thomsonreuters.com/"
  },
  qa: {
    name: "QA",
    url: "https://author-qa-ams.ewp.thomsonreuters.com/"
  },
  uat: {
    name: "UAT",
    url: "https://author-uat-ams.ewp.thomsonreuters.com/"
  },
  ppe: {
    name: "PPE",
    url: "https://author-ppe-ams.ewp.thomsonreuters.com/"
  },
  production: {
    name: "Production",
    url: "https://author-prod-ams.ewp.thomsonreuters.com/"
  }
};

var getServers = function(url) {
  url = new URL(url);

  var results = [];
  Object.keys(servers).forEach(function(name) {
    var server = servers[name];
    var serverUrl = new URL(url);

    serverUrl.protocol = server.protocol;
    serverUrl.host = server.host;

    results.push(new Server(server.id, server.name, serverUrl));
  });

  return results;
}

class Keyboard {
  addEventListeners(menu) {
    this.addMoveUp(menu);
    this.addMoveDown(menu);
    this.addLaunch(menu);
  }

  addMoveUp(menu) {
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 38 || event.keyCode === 75) {
        menu.moveUp();
      }
    });
  }

  addMoveDown(menu) {
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 40 || event.keyCode === 74) {
        menu.moveDown();
      }
    });
  }

  addLaunch(menu) {
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 13 || event.keyCode == 79) {
        menu.launch();
        menu.close();
      }
    })
  }
}

class AemPageState {
  constructor(mode) {
    this.mode = mode;
    this.selectedIndex = 0;
    this.pages = [];
  }

  appendPage(page) {
    this.pages.push(page);
  }
}

var navigateTo = function(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentUrl = tabs[0].url;
    chrome.tabs.update(tabs[0].id, { url: url }, () => {
      chrome.history.addUrl({ url: currentUrl });
    });
  });
};

var getPages = function(page) {
  return [
    page.editorPage,
    page.previewPage,
    page.crxDePage,
    page.crxPackMgrPage,
    page.sitesPage,
    page.userAdminPage
  ];
};

var getSelectionDiv = function(id, name, url) {
  var result = document.createElement('div');
  result.id = id;
  result.className = 'page';
  result.textContent = name;
  result.onclick = function() {
    navigateTo(url);
  };

  return result;
};

var appendError = function(exception) {
  var newError = document.createElement('div');
  newError.className = 'error';
  newError.textContent = exception.toString();

  var errorsDiv = document.getElementById('errors');
  errorsDiv.appendChild(newError);

  return;
};

var createPagesMenu = function(url) {
  var currentPage = AemPage.getPage(url);
  var state = new AemPageState("pages");

  var i = 0;
  var currentIndex = 0;
  getPages(currentPage).forEach(function(page) {
    if (currentPage.id === page.id) {
      currentIndex = i;
    } else {
      i += 1;
    }

    state.appendPage(page);
  });

  var menu = new Menu(currentIndex, state.pages);
  var keyboard = new Keyboard();
  keyboard.addEventListeners(menu);

  return menu;
};

var createServersMenu = function(url) {
  var currentUrl = new URL(AemPage.getPage(url));
  var state = new AemPageState("pages");

  var i = 0;
  var currentIndex = 0;
  getServers(currentUrl).forEach(function(server) {
    if (server.url.origin === currentUrl.origin) {
      currentIndex = i;
    } else {
      i += 1;
    }

    state.appendPage(server);
  });

  var menu = new Menu(currentIndex, state.pages);
  var keyboard = new Keyboard();
  keyboard.addEventListeners(menu);

  return menu;
};

var createCrxDePagesMenu = function(url) {
  var state = new AemPageState("pages");

  getCrxDePages(Object.keys(servers)).forEach(function(page) {
    console.log(page.toString());
    state.appendPage(page);
  });

  var menu = new Menu(0, state.pages);
  var keyboard = new Keyboard();
  keyboard.addEventListeners(menu);

  return menu;
};

interface Server {
  name: string;
  url: string;
}

interface Options {
  localhost: Server;
  dev: Server;
  qa: Server;
  uat: Server;
  ppe: Server;
  production: Server;
}

// TODO: Convert to async/await
var initialize = (andThen: any) => {
  // TODO: add await
  var options = { ...defaultValues }
  // var options = {
  //   localhost: ,
  //   qa: "",
  //   uat: "",
  //   ppe: "",
  //   production: ""
  // };

  chrome.storage.sync.get(options, (saved_values: Options) => {
    options = saved_values;
    // defaultValues.localhost.url = saved_values.localhost;
    // servers.qa.host = saved_values.qa;
    // servers.uat.host = saved_values.uat;
    // servers.ppe.host = saved_values.ppe;
    // servers.production.host = saved_values.production;

    andThen();
  });
};

var main = function() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    var tab = tabs[0];
    var url = tab.url;

    var currentPage = null;
    try {
      currentPage = AemPages.getPage(url);

      var mode = "pages";
      var menu = createPagesMenu(url);
      menu.render();

      chrome.commands.onCommand.addListener(function(command) {
        if (command === "select") {
          if (mode === "pages") {
            mode = "servers";

            menu.clear();
            menu.pages = [];
            menu = createServersMenu(url);
            menu.render();
          } else {
            mode = "pages";

            menu.clear();
            menu.pages = [];
            menu = createPagesMenu(url);
            menu.render();
          };
        }
      });
    } catch (exception) {
      var menu = createCrxDePagesMenu();
      menu.render();
    }
  });
};

// Initalize the popup window.
document.addEventListener('DOMContentLoaded', function() {
  initialize(main);
});
