import { AemPage, aemPageTypes } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";

export class PreviewPage extends AemPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/

  static isPage(url: URL): boolean {
    return url.searchParams.get('wcmmode') === 'disabled';
  }

  get getType(): aemPageTypes {
    return "Preview";
  }

  get id(): string {
    return 'preview-page';
  }

  get editorPage(): AemPage {
    var url = new URL(this._url.toString());

    url.pathname =`/editor.html${url.pathname}`;
    url.searchParams.delete('wcmmode');

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    return this;
  }

  get crxDePage(): AemPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this._url.pathname.match(regex)[1] || this._url.pathname;
    var url = new URL(`${this._url.origin}/crx/de/index.jsp#${jcrPath}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this._url.pathname.match(regex)[1] || this._url.pathname;
    var url = new URL(`${this._url.origin}/crx/packmgr/index.jsp#${jcrPath}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    var url = new URL(`${this._url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this._url.pathname.match(regex)[1] || this._url.pathname;
    var url = new URL(`${this._url.origin}/sites.html${jcrPath}`);

    return new SitesPage(url);
  }

  get consolePage(): AemPage {
    const url = new URL(`${this.url.origin}/system/console`);

    return new ConsolePage(url);
  }

  get loginPage(): AemPage {
    const url = new URL(`${this.url.origin}/libs/granite/core/content/login.html`);

    return new LoginPage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
