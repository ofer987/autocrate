import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { DisabledPage } from "./disabledPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class UserAdminPage extends AemPage {
  static pathRegex = /^\/useradmin$/;

  static isPage(url: URL) {
    return UserAdminPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "User Admin";
  }

  get editorPage(): PageType {
    return new DisabledPage(this.url);
  }

  get previewPage(): PageType {
    return new DisabledPage(this.url);
  }

  get crxDePage(): PageType {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): PageType {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): PageType {
    return this;
  }

  get sitesPage(): PageType {
    const url = new URL(`${this.url.origin}/sites.html/content`);

    return new SitesPage(url);
  }

  get consolePage(): PageType {
    const url = new URL(`${this.url.origin}/system/console`);

    return new ConsolePage(url);
  }

  get loginPage(): PageType {
    const url = new URL(`${this.url.origin}/libs/granite/core/content/login.html`);

    return new LoginPage(url);
  }

  get startPage(): PageType {
    const url = new URL(`${this.url.origin}/aem/start`);

    return new StartPage(url);
  }

  get welcomePage(): PageType {
    const url = new URL(`${this.url.origin}/welcome`);

    return new WelcomePage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
