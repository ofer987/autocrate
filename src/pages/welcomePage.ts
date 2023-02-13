import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { DisabledPage } from "./disabledPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { UserAdminPage } from "./userAdminPage";

export class WelcomePage extends AemPage {
  static pathRegex = /^\/welcome$/;

  static isPage(url: URL) {
    return WelcomePage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Welcome";
  }

  get editorPage(): PageType {
    return {
      pageType: "Editor",
      url: this.url
    };
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
    const url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
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
    return this;
  }

  constructor(url: URL) {
    super(url);
  }
}
