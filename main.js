// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  var code = `(function() {
    // alert("hello");
    // alert(\`The window's location is ${window.location}\`)
    // alert(\`The window's location is ${tab.url}\`)
    // console.log(window.location);
    // console.log(tab.url);
  })();`

  chrome.tabs.executeScript({ code: code }, function() {
    // alert("bye");
    // alert(`The window's location is ${tab.url}`)
    alert(tab.id);
    var url = tab.url;

    alert(`URL: ${url.toString()} (type: ${typeof(url)})`);
    alert(`The PreviewUrl is ${new EditorUrl(url).toPreviewUrl()}`);

    chrome.tabs.update({ url: new EditorUrl(url).toPreviewUrl()} );

    // chrome.tabs.getCurrent(function(tab) {
    //   chrome.tabs.update(tab.id, { url: new EditorUrl(url).toPreviewUrl() });
    // });
    // alert(`Valid: ${url.isAemValidUrl()}`);
  });
});

class AemUrl {
  // constructor(url) {
  //   this.url = url;
  //
  //   if (!this.isValid) {
  //     throw `Sorry the url (${this.url}) is not valid`;
  //   }
  // }

  // static create(url) {
  //   var value = new URL(url);
  //
  //   if (EditorUrl.isValid(value)) {
  //     return new EditorUrl(value);
  //   }
  //   // } else if (PreviewUrl.isValid(value)) {
  //   //   return new PreviewUrl(value);
  //   // }
  //
  //   throw `Sorry the url (${url}) is not valid`;
  // }
  //
  //
  // get isValid() {
  //   if (typeof(this.url) !== 'string') {
  //     return false;
  //   }
  //
  //   if (!this.isAemValidUrl) {
  //     return false;
  //   }
  //
  //   return true;
  // }

  // get isAemValidUrl() {
  //   var regex = /http(s):\/\/.*\/editor\.html\/(.*)\.html/
  //
  //   return regex.test(this.url);
  // }

  // get previewUrl() {
  //   var regex = /(http(s)):\/\/([^\.]*)?([^\.]*)([^\.]*)\/(editor\.html)\/(.*)(\.html)/
  //   // https://www.google.com/test/me.html
  //   (this.url.match(regex) || [])[]
  // }

  // get toString() {
  //   return this.url;
  // }

  constructor(url) {
    this.url = url;
  }
}

class EditorUrl extends AemUrl {
  static pathRegex = /^\/editor\.html(\/.*)$/

  static isUrl(url) {
    return EditorUrl.pathRegex.test(url.pathname);
  }

  constructor(url) {
    super(new URL(url));
  }

  toPreviewUrl() {
    // alert(`The url is ${this.url} (type: ${this.url})`);
    return `${this.url.origin}${this.url.pathname.match(EditorUrl.pathRegex)[1]}\.html?wcmmode=disabled`;
  }
}

// Dr. David Smith
// 1333 Sheppard Avenue East
// Unit 228
// Monday to Thursday 9 to 4 (break 12 to 1)
// Friday 9 to 12
// 416-783-3375
