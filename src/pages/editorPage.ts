import { AemPage, aemPageTypes } from "./aemPage";
import { UserAdminPage } from "./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class EditorPage extends AemPage {
  static pathRegex = /^\/editor\.html(\/.*)\.html/

  static isPage(url: URL) {
    return EditorPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Editor";
  }

  get editorPage(): AemPage {
    return this;
  }

  get previewPage(): AemPage {
    var url = new URL(`${this._url.origin}${this._url.pathname.match(EditorPage.pathRegex)[1]}\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    var url = new URL(`${this._url.origin}/crx/de/index.jsp#${this._url.pathname.match(EditorPage.pathRegex)[1]}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    var url = new URL(`${this._url.origin}/crx/packmgr/index.jsp#${this._url.pathname.match(EditorPage.pathRegex)[1]}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    var url = new URL(`${this._url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    var url = new URL(`${this._url.origin}/sites.html${this._url.pathname.match(EditorPage.pathRegex)[1]}`);

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
