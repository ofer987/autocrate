export type aemPageTypes = "Editor"
  | "Preview"
  | "CrxDe"
  | "Package Manager"
  | "User Admin"
  | "Sites";

export abstract class AemPage {
  static getPageTypes(): aemPageTypes[] {
    return [
      "Editor",
      // "Preview",
      "CrxDe",
      "Package Manager",
      "User Admin",
      "Sites",
    ]
  }

  protected _url: URL;

  get url() {
    return this._url;
  }

  abstract get getType(): aemPageTypes;

  abstract get editorPage(): AemPage;

  abstract get previewPage(): AemPage;

  abstract get crxDePage(): AemPage;

  abstract get crxPackMgrPage(): AemPage;

  abstract get userAdminPage(): AemPage;

  abstract get sitesPage(): AemPage;

  switchAemPage(pageType: aemPageTypes): AemPage {
    switch (pageType) {
      case "Editor": return this.editorPage;
      case "Preview": return this.previewPage;
      case "CrxDe": return this.crxDePage;
      case "Package Manager": return this.crxPackMgrPage;
      case "User Admin": return this.userAdminPage;
      case "Sites": return this.sitesPage;
    }
  }

  constructor(url: URL) {
    this._url = url;
  }
}
