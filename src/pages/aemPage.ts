export type aemPageTypes = "Non AEM Page"
  | "Disabled Page"
  | "Editor"
  | "Preview"
  | "CrxDe"
  | "Package Manager"
  | "User Admin"
  | "Sites"
  | "Console"
  | "Login";

export abstract class AemPage {
  protected _url: URL;

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

  switchAemPage(pageType: aemPageTypes): AemPage {
    switch (pageType) {
      case "Editor": return this.editorPage;
      case "Preview": return this.previewPage;
      case "CrxDe": return this.crxDePage;
      case "Package Manager": return this.crxPackMgrPage;
      case "User Admin": return this.userAdminPage;
      case "Sites": return this.sitesPage;
      case "Console": return this.consolePage;
      case "Login": return this.loginPage;
    }
  }

  constructor(url: URL) {
    this._url = url;
  }
}
