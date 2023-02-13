import { AemPage, aemPageTypes } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class PreviewPage extends AemPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/;

  static isPage(url: URL): boolean {
    return url.searchParams.get('wcmmode') === 'disabled';
  }

  get getType(): aemPageTypes {
    return "Preview";
  }

  get editorPage(): AemPage {
    const url = new URL(this.url.toString());

    url.pathname =`/editor.html${url.pathname}`;
    url.searchParams.delete('wcmmode');

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    return this;
  }

  get crxDePage(): AemPage {
    const regex = /(\/.*)\.html/;

    const jcrPath = (this.url.pathname.match(regex) || [])[1] || this.url.pathname;
    const url = new URL(`${this.url.origin}/crx/de/index.jsp#${jcrPath}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    const regex = /(\/.*)\.html/;

    const jcrPath = (this.url.pathname.match(regex) || [])[1] || this.url.pathname;
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${jcrPath}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    const url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    const regex = /(\/.*)\.html/;

    const jcrPath = (this.url.pathname.match(regex) || [])[1] || this.url.pathname;
    const url = new URL(`${this.url.origin}/sites.html${jcrPath}`);

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
