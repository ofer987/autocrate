class State {
  static INITIALIZED = {
    errors: {
      className: 'hidden'
    },
    urls: {
      className: 'hidden'
    }
  }

  static AemPage = {
    errors: {
      className: 'hidden'
    },
    urls: {
      className: 'displayed'
    }
  }

  static NotAemPage = {
    errors: {
      className: 'displayed'
    },
    urls: {
      className: 'hidden'
    }
  }

  static Errors = {
    errors: {
      className: 'displayed'
    },
    urls: {
      className: 'hidden'
    }
  }

  constructor(state) {
    this.state = state;

    _apply();
  }

  change(newState) {
    this.state = newState;

    _apply();
  }

  _apply() {

    var ids = Object.keys(this.state);
    ids.forEach(function(idName) {
      var element = document.getElementById(idName)
      var properties = Object.keys(ids[idName]);

      properties.forEach(function(key) {
        var value = properties[key];

        element[key] = value;
      });
    });
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

    var urls = document.getElementById("urls")

    getSelectionDivs(page).forEach(function(div) {
      urls.appendChild(div);
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
