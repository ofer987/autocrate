import { AemPage, aemPageTypes } from "./aemPage";
import { DisabledPage } from "./disabledPage";
import { EditorPage } from "./editorPage";
import { CrxDePage } from "./crxDePage";
import { UserAdminPage } from "./userAdminPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class CrxPackMgrPage extends AemPage {
  static pathRegex = /^\/crx\/packmgr\/index\.jsp#?(.*)$/;

  static isPage(url: URL): boolean {
    return CrxPackMgrPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "CRX / DE Package Manager";
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
    var url = new URL(this._url.toString());
    url.pathname = '/crx/de/index.jsp';

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    return this;
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

  get welcomePage(): AemPage {
    const url = new URL(`${this.url.origin}/welcome`);

    return new WelcomePage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
