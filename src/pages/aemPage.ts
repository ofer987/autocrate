import { PageType, aemPageTypes } from "./pageType";

export abstract class AemPage {
  private _url: URL;

  get url() {
    return this._url;
  }

  get isEnabled(): boolean {
    return true;
  }

  abstract get getType(): aemPageTypes;

  abstract get editorPage(): PageType;

  abstract get previewPage(): PageType;

  abstract get crxDePage(): PageType;

  abstract get crxPackMgrPage(): PageType;

  abstract get userAdminPage(): PageType;

  abstract get sitesPage(): PageType;

  abstract get consolePage(): PageType;

  abstract get loginPage(): PageType;

  abstract get startPage(): PageType;

  abstract get welcomePage(): PageType;

  get isAemPage(): boolean {
    return this.getType !== "Non AEM Page";
  }

  switchAemPage(pageType: aemPageTypes): PageType {
    switch (pageType) {
      case "Editor": return this.editorPage;
      case "Preview": return this.previewPage;
      case "CRX / DE JCR Manager": return this.crxDePage;
      case "CRX / DE Package Manager": return this.crxPackMgrPage;
      case "User Admin": return this.userAdminPage;
      case "Sites": return this.sitesPage;
      case "Console": return this.consolePage;
      case "Login": return this.loginPage;
      case "Start": return this.startPage;
      case "Welcome": return this.welcomePage;
      case "Non AEM Page": return {
        pageType: "Non AEM Page",
        url: this.url
      };
    }

    throw `No page type for ${pageType}`;
  }

  constructor(url: URL) {
    this._url = url;
  }

  protected validate(): void {
    if (!this.url) {
      throw "URL is null or undefined";
    }
  }
}
