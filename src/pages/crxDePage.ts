import { AemPage, aemPageTypes } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";
import { DisabledPage } from "./disabledPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";

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
    var url = new URL(`${this._url.origin}/sites.html${this._url.hash.substring(1)}`);

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

  get startPage(): AemPage {
    const url = new URL(`${this.url.origin}/aem/start`);

    return new StartPage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
