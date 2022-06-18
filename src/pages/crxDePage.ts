import { AemPage, aemPageTypes } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";
import { DisabledPage } from "./disabledPage";

export class CrxDePage extends AemPage {
  static pathRegex = /^\/crx\/de\/index\.jsp$/;

  static isPage(url: URL): boolean {
    return CrxDePage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "CrxDe";
  }

  get editorPage(): AemPage {
    if (this._url.hash === "") {
      return new DisabledPage(this.url);
    }

    var url = new URL(`${this._url.origin}/editor.html${this._url.hash.substring(1)}\.html`);
    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    if (this._url.hash === "") {
      return new DisabledPage(this.url);
    }

    var url = new URL(`${this._url.origin}${this._url.hash.substring(1)}\.html?wcmmode=disabled`);
    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    return this;
  }

  get crxPackMgrPage(): AemPage {
    var url = new URL(this._url.toString());
    url.pathname = '/crx/packmgr/index.jsp';

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    var url = new URL(`${this._url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    if (this._url.hash === "") {
      return new DisabledPage(this.url);
    }

    var url = new URL(`${this._url.origin}/sites.html${this._url.hash.substring(1)}`);
    return new SitesPage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
