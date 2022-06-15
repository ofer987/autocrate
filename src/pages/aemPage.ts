export abstract class AemPage {
  protected _url: URL;

  get url() {
    return this._url;
  }

  abstract get editorPage(): AemPage;

  abstract get previewPage(): AemPage;

  abstract get crxDePage(): AemPage;

  abstract get crxPackMgrPage(): AemPage;

  abstract get userAdminPage(): AemPage;

  abstract get sitesPage(): AemPage;

  constructor(url: URL) {
    this._url = url;
  }
}
