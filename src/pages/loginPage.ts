import { AemPage, aemPageTypes } from "./aemPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { UserAdminPage } from "./userAdminPage";
import { DisabledPage } from "./disabledPage";
import { ConsolePage } from "./consolePage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class LoginPage extends AemPage {
  static pathRegex = /^\/\/libs\/granite\/core\/content\/login\.html$/;

  get url() {
    return this._url;
  }

  static isPage(url: URL) {
    return LoginPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Login";
  }

  get editorPage(): AemPage {
    return new DisabledPage(this.url);
  }

  get previewPage(): AemPage {
    return new DisabledPage(this.url);
  }

  get crxDePage(): AemPage {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    const url = new URL(`${this.url.origin}/sites.html/content`);

    return new SitesPage(url);
  }

  get consolePage(): AemPage {
    const url = new URL(`${this.url.origin}/system/console`);

    return new ConsolePage(url);
  }

  get loginPage(): AemPage {
    const url = new URL(
      `${this.url.origin}/libs/granite/core/content/login.html`
    );

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
