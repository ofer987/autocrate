import { aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";
import { DisabledPage } from "./disabledPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class CrxDePage extends AemPage {
  static pathRegex = /^\/crx\/de\/index\.jsp$/;

  static isPage(url: URL): boolean {
    return CrxDePage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "CRX / DE JCR Manager";
  }

  get editorPage(): AemPage {
    if (this.url.hash === "") {
      return new DisabledPage(this.url);
    }

    const url = new URL(`${this.url.origin}/editor.html${this.url.hash.substring(1)}.html`);
    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    if (this.url.hash === "") {
      return new DisabledPage(this.url);
    }

    const url = new URL(`${this.url.origin}${this.url.hash.substring(1)}.html?wcmmode=disabled`);
    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    return this;
  }

  get crxPackMgrPage(): AemPage {
    const url = new URL(this.url.toString());
    url.pathname = '/crx/packmgr/index.jsp';

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    const url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    const url = new URL(`${this.url.origin}/sites.html${this.url.hash.substring(1)}`);

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
