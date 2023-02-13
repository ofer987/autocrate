import { NonAemPage } from "./nonAemPage";

export type aemPageTypes = "Non AEM Page"
  | "Disabled Page"
  | "Editor"
  | "Preview"
  | "CRX / DE JCR Manager"
  | "CRX / DE Package Manager"
  | "User Admin"
  | "Sites"
  | "Console"
  | "Login"
  | "Start"
  | "Welcome";

export abstract class AemPage {
  private _url: URL;

  get url() {
    return this._url;
  }

  get isEnabled(): boolean {
    return true;
  }

  abstract get getType(): aemPageTypes;

  abstract get editorPage(): AemPage;

  abstract get previewPage(): AemPage;

  abstract get crxDePage(): AemPage;

  abstract get crxPackMgrPage(): AemPage;

  abstract get userAdminPage(): AemPage;

  abstract get sitesPage(): AemPage;

  abstract get consolePage(): AemPage;

  abstract get loginPage(): AemPage;

  abstract get startPage(): AemPage;

  abstract get welcomePage(): AemPage;

  get isAemPage(): boolean {
    return this.getType !== "Non AEM Page";
  }

  switchAemPage(pageType: aemPageTypes): AemPage {
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
    }

    return new NonAemPage(new URL(window.location.toString()));
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
