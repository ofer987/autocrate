var getClassNames = function(className) {
  className = (className || '').trim();

  if (className.length === 0) {
    return [];
  }

  return className.split(' ');
};

const serverUrls = [
  {
    name: 'Localhost',
    url: 'http://localhost:4502'
  },
  {
    name: 'QA',
    url: ''
  },
  {
    name: 'Author UAT',
    url: ''
  },
  {
    name: 'Author PPE',
    url: ''
  },
  {
    name: 'Author Production',
    url: ''
  }
];

class Keyboard {
  addEventListeners(menu) {
    this.addMoveUp(menu);
    this.addMoveDown(menu);
    this.addOpen(menu);
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

  addOpen(menu) {
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 13 || event.keyCode == 79) {
        menu.open();
      }
    })
  }
}

class Menu {
  setSelectedPage(id) {
    var selectedPage = this.menuElement.querySelector(`#${id}`);
    var className = selectedPage.className;
    var classNames = getClassNames(className);

    classNames.push('selected');
    selectedPage.className = classNames.join(' ');
  }

  get pageElements() {
    return this.menuElement.querySelectorAll('.page');
  }

  get menuElement() {
    return document.getElementById('pages');
  }

  constructor(selectedIndex, pages) {
    this.pages = pages;
    this.selectedIndex = selectedIndex;
  }

  moveUp() {
    var currentIndex = this.selectedIndex;
    var pageLength = this.pages.length;

    // rollover
    if (currentIndex <= 0) {
      this.selectedIndex = this.pages.length - 1;
    } else {
      this.selectedIndex -= 1;
    }

    this.render();
  }

  moveDown() {
    var currentIndex = this.selectedIndex;
    var pageLength = this.pages.length;

    // rollover
    if (currentIndex + 1 >= pageLength) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }

    this.render();
  }

  open() {
    var selectedPage = this.pages[this.selectedIndex];

    navigateTo(selectedPage.toString());
  }

  clear() {
    this.pageElements.forEach(function(page) {
      page.remove();
    });
  }

  render() {
    this.clear();

    var menuElement = this.menuElement;
    this.pages.forEach(function(page) {
      var pageElement = getSelectionDiv(page.id, page.name, page.toString());

      menuElement.appendChild(pageElement);
    });

    this.setSelectedPage(this.pages[this.selectedIndex].id);
  }
}

class AemPageState {
  static initial = {
    errors: {
      className: 'hidden'
    },
    pages: {
      className: 'displayed',
      selectedIndex: 0,
      items: [
      ]
    }
  }

  get pages() {
    return this.state.pages.items;
  }

  appendPage(page) {
    this.pages.push(page);
  }

  constructor() {
    this.state = AemPageState.initial
  }
}

var navigateTo = function(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.update(tabs[0].id, { url: url });
  });
};

var getPages = function(page) {
  return [
    page.editorPage,
    page.previewPage,
    page.crxDePage,
    page.crxPackMgrPage
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

// Initalize the popup window.
document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    var tab = tabs[0];
    var url = tab.url;

    var currentPage = null;
    try {
      currentPage = AemPage.getPage(url);

      var pages = document.getElementById("pages")

      var state = new AemPageState();
      var i = 0;
      getPages(currentPage).forEach(function(page) {
        if (currentPage.id === page.id) {
          currentIndex = i;
        } else {
          i += 1;
        }
        state.appendPage(page);
      });

      var menu = new Menu(currentIndex, state.pages);
      menu.render();

      var keyboard = new Keyboard();
      keyboard.addEventListeners(menu);
    } catch (exception) {
      appendError(exception);

      throw exception;
    }
  });
});

class AemPage {
  static getPage(url) {
    url = new URL(url);

    if (EditorPage.isPage(url)) return new EditorPage(url);
    if (PreviewPage.isPage(url)) return new PreviewPage(url);
    if (CrxDePage.isPage(url)) return new CrxDePage(url);
    if (CrxPackMgrPage.isPage(url)) return new CrxPackMgrPage(url);

    throw `Sorry the url (${url}) is not an AEM page`;
  }

  constructor(url) {
    this.url = url;
  }

  toString() {
    return this.url.toString();
  }
}

class CrxPackMgrPage extends AemPage {
  static pathRegex = /^\/crx\/packmgr\/index\.jsp#?(.*)$/;

  static isPage(url) {
    url = new URL(url);

    return CrxPackMgrPage.pathRegex.test(new URL(url).pathname);
  }

  get id() {
    return 'crx-pack-mgr';
  }

  get name() {
    return "CRX / Package Manager";
  }

  constructor(url) {
    super(new URL(url));
  }

  get editorPage() {
    var url = `${this.url.origin}/editor.html${this.url.hash.substr(1)}\.html`;

    return new EditorPage(url);
  }

  get previewPage() {
    var url = `${this.url.origin}${this.url.hash.substr(1)}\.html?wcmmode=disabled`;

    return new PreviewPage(url);
  }

  get crxDePage() {
    var url = new URL(this.url);
    url.pathname = '/crx/de/index.jsp';

    return new CrxDePage(url);
  }

  get crxPackMgrPage() {
    return this;
  }
}

class CrxDePage extends AemPage {
  static pathRegex = /^\/crx\/de\/index\.jsp#?(.*)$/;

  static isPage(url) {
    url = new URL(url);

    return CrxDePage.pathRegex.test(new URL(url).pathname);
  }

  get id() {
    return 'crx-de';
  }

  get name() {
    return "CRX / DE";
  }

  constructor(url) {
    super(new URL(url));
  }

  get editorPage() {
    var url = `${this.url.origin}/editor.html${this.url.hash.substr(1)}\.html`;

    return new EditorPage(url);
  }

  get previewPage() {
    var url = `${this.url.origin}${this.url.hash.substr(1)}\.html?wcmmode=disabled`;

    return new PreviewPage(url);
  }

  get crxDePage() {
    return this;
  }

  get crxPackMgrPage() {
    var url = new URL(this.url);
    url.pathname = '/crx/packmgr/index.jsp';

    return new CrxPackMgrPage(url);
  }
}

class EditorPage extends AemPage {
  static pathRegex = /^\/editor\.html(\/.*)\.html/

  static isPage(url) {
    url = new URL(url);

    return EditorPage.pathRegex.test(new URL(url).pathname);
  }

  get id() {
    return 'editor-page';
  }

  get name() {
    return 'Editor';
  }

  constructor(url) {
    super(new URL(url));
  }

  get editorPage() {
    return this;
  }

  get previewPage() {
    var url = `${this.url.origin}${this.url.pathname.match(EditorPage.pathRegex)[1]}\.html?wcmmode=disabled`;

    return new PreviewPage(url);
  }

  get crxDePage() {
    var url = `${this.url.origin}/crx/de/index.jsp#${this.url.pathname.match(EditorPage.pathRegex)[1]}`;

    return new CrxDePage(url);
  }

  get crxPackMgrPage() {
    var url = `${this.url.origin}/crx/packmgr/index.jsp#${this.url.pathname.match(EditorPage.pathRegex)[1]}`;

    return new CrxPackMgrPage(url);
  }
}

class PreviewPage extends AemPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/

  static isPage(url) {
    url = new URL(url);

    return url.searchParams.get('wcmmode') === 'disabled'
  }

  get id() {
    return 'preview-page';
  }

  get name() {
    return 'Preview';
  }

  constructor(url) {
    super(new URL(url));
  }

  get editorPage() {
    var searchParams = new URLSearchParams(this.url.searchParams);
    searchParams.delete('wcmmode');

    var url = `${this.url.origin}/editor.html/${this.url.pathname}?${searchParams.toString()}`;

    return new EditorPage(url);
  }

  get previewPage() {
    return this;
  }

  get crxDePage() {
    var regex = /(\/.*)\.html/;

    var jcrPath = this.url.pathname.match(regex)[1] || this.url.pathname;
    var url = `${this.url.origin}/crx/de/index.jsp#${jcrPath}`;

    return new CrxDePage(url);
  }

  get crxPackMgrPage() {
    var regex = /(\/.*)\.html/;

    var jcrPath = this.url.pathname.match(regex)[1] || this.url.pathname;
    var url = `${this.url.origin}/crx/packmgr/index.jsp#${jcrPath}`;

    return new CrxPackMgrPage(url);
  }
}
