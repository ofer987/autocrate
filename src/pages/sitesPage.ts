import { AemPage, aemPageTypes } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from "./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { PreviewPage } from "./previewPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class SitesPage extends AemPage {
  static pathRegex = /^\/sites\.html(\/.*)/;

  static isPage(url: URL) {
    return SitesPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Sites";
  }

  get editorPage(): AemPage {
    const url = new URL(`${this.url.origin}/editor.html${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}.html`);

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    const url = new URL(`${this.url.origin}${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp#${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    const url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    return this;
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

    this.validate();
  }
}
