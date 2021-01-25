var getClassNames(className) {
  className = (className || '').trim();

  if (className.length === 0) {
    return [];
  }

  return className.split(' ');
}

class State {
  static INITIALIZED = {
    errors: {
      className: 'hidden'
    },
    pages: {
      className: 'hidden'
    }
  }

  static AemPage = new AemPageState();
  // static AemPage = {
  //   errors: {
  //     className: 'hidden'
  //   },
  //   pages: {
  //     className: 'displayed'
  //     selection: null
  //   }
  // }

  static NotAemPage = {
    errors: {
      className: 'displayed'
    },
    pages: {
      className: 'hidden'
    }
  }

  static Errors = {
    errors: {
      className: 'displayed'
    },
    pages: {
      className: 'hidden'
    }
  }

  constructor(state) {
    this.state = state;

    this._apply();
  }

  change(newState) {
    this.state = newState;

    this._apply();
  }

  _apply() {
    var ids = Object.keys(this.state);
    ids.forEach(function(idName) {
      var element = document.getElementById(idName)
      var properties = ids[idName];
      element.className = properties['className'];

      if (this.selectedQuery) {
        this._clearSelection(element);
        this._applySelection(element, properties['selection']);
      }
    });
  }

  _applySelection(element, selectionQuery) {
    var selectedElement = element.querySelector(selectionQuery)
    var classNames = getClassNames(selectedElement.className);

    classNames.append("selected");
    selectedElement.className = classNames.join(' ');
  }

  _clearSelection(element) {
    element.children.forEach(function(child) {
      var classNames = getClassNames(child.className);

      var otherClassNames = classNames
        .filter(function(item) { return !/selected/.test(item); });
    });
  }
}

class AemPageState extends State {
  static initial = {
    errors: {
      className: 'hidden'
    },
    pages: {
      className: 'displayed'
      selectedIndex: 0,
      pageSelectors: [
      ]
    }
  }

  get pages() {
    return this.state.pages;
  }

  get selectedQuery() {
    return this.pages.pageQuerySelectors[this.pages.selectedIndex];
  }

  constructor() {
    super(AemPageState.initial)
  }

  moveDown() {
    var currentIndex = this.pages.selectedIndex;
    var pageLength = this.pages.pageSelectors.length;
    if (currentIndex + 1 === pageLength) {
      this.pages.selectedIndex = 0;
    }

    this.pages.selectedIndex += 1;

    this._apply();
  }
}

var navigateTo = function(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.update(tabs[0].id, { url: url });
  });
};

var getSelectionDivs = function(page) {
  return [
    getSelectionDiv('Editor', page.editorPage.toString()),
    getSelectionDiv('Preview', page.previewPage.toString())
  ];
};

var getSelectionDiv = function(name, url) {
  var result = document.createElement('div');
  result.className = 'url';
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

    var page = null;
    try {
      page = AemPage.getPage(url);
    } catch (exception) {
      appendError(exception);

      return;
    }

    var pages = document.getElementById("pages")

    getSelectionDivs(page).forEach(function(div) {
      pages.appendChild(div);
    });
  });
});

class AemPage {
  static getPage(url) {
    url = new URL(url);

    if (EditorPage.isPage(url)) return new EditorPage(url);
    if (PreviewPage.isPage(url)) return new PreviewPage(url);

    throw `Sorry the url (${url}) is not an AEM page`;
  }

  constructor(url) {
    this.url = url;
  }

  toString() {
    return this.url.toString();
  }
}

class EditorPage extends AemPage {
  static pathRegex = /^\/editor\.html(\/.*)$/

  static isPage(url) {
    url = new URL(url);

    return EditorPage.pathRegex.test(new URL(url).pathname);
  }

  constructor(url) {
    super(new URL(url));
  }

  get editorPage() {
    return this;
  }

  get previewPage() {
    var url = `${this.url.origin}${this.url.pathname.match(EditorPage.pathRegex)[1]}?wcmmode=disabled`;

    return new PreviewPage(url);
  }
}

class PreviewPage extends AemPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/

  static isPage(url) {
    url = new URL(url);

    return url.searchParams.get('wcmmode') === 'disabled'
  }

  constructor(url) {
    super(new URL(url));
  }

  get editorPage() {
    var searchParams = new URLSearchParams(this.url.searchParams);
    searchParams.delete('wcmmode');

    var url = `${this.url.origin}editor.html/${this.url.pathname}?${searchParams.toString()}`;

    return new EditorPage(url);
  }

  get previewPage() {
    return this;
  }
}
