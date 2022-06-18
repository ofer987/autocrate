import { AemPage, aemPageTypes } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from "./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { PreviewPage } from "./previewPage";

export class SitesPage extends AemPage {
  static pathRegex = /^\/sites\.html(\/.*)/

  static isPage(url: URL) {
    return SitesPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Sites";
  }

  get id(): string {
    return 'sites-page';
  }

  get editorPage(): AemPage {
    var url = new URL(`${this._url.origin}/editor.html${this._url.pathname.match(SitesPage.pathRegex)[1]}\.html`);

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    var url = new URL(`${this._url.origin}${this._url.pathname.match(SitesPage.pathRegex)[1]}\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    var url = new URL(`${this._url.origin}/crx/de/index.jsp#${this._url.pathname.match(SitesPage.pathRegex)[1]}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    var url = new URL(`${this._url.origin}/crx/packmgr/index.jsp#${this._url.pathname.match(SitesPage.pathRegex)[1]}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    var url = new URL(`${this._url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    return this;
  }

  constructor(url: URL) {
    super(url);
  }
}
