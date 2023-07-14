import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class PreviewPage extends AemPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/;

  static isPage(url: URL): boolean {
    return url.searchParams.get('wcmmode') === 'disabled';
  }

  get getType(): aemPageTypes {
    return "Preview";
  }

  get editorPage(): PageType {
    const url = new URL(this.url.toString());

    url.pathname =`/editor.html${url.pathname}`;
    url.searchParams.delete('wcmmode');

    return {
      pageType: "Editor",
      url: url
    };
  }

  get previewPage(): PageType {
    return {
      pageType: "Disabled Page",
      url: this.url
    };
  }

  get crxDePage(): PageType {
    const regex = /(\/.*)\.html/;

    const jcrPath = (this.url.pathname.match(regex) || [])[1] || this.url.pathname;
    const url = new URL(`${this.url.origin}/crx/de/index.jsp#${jcrPath}`);

    return {
      pageType: "CRX / DE JCR Manager",
      url: url
    };
  }

  get crxPackMgrPage(): PageType {
    const regex = /(\/.*)\.html/;

    const jcrPath = (this.url.pathname.match(regex) || [])[1] || this.url.pathname;
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${jcrPath}`);

    return {
      pageType: "CRX / DE Package Manager",
      url: url
    };
  }

  get userAdminPage(): PageType {
    const url = new URL(`${this.url.origin}/useradmin`);

    return {
      pageType: "User Admin",
      url: url
    };
  }

  get sitesPage(): PageType {
    const regex = /(\/.*)\.html/;

    const jcrPath = (this.url.pathname.match(regex) || [])[1] || this.url.pathname;
    const url = new URL(`${this.url.origin}/sites.html${jcrPath}`);

    return {
      pageType: "Sites",
      url: url
    };
  }

  get consolePage(): PageType {
    const url = new URL(`${this.url.origin}/system/console`);

    return {
      pageType: "Console",
      url: url
    };
  }

  get loginPage(): PageType {
    const url = new URL(`${this.url.origin}/libs/granite/core/content/login.html`);

    return {
      pageType: "Login",
      url: url
    };
  }

  get startPage(): PageType {
    const url = new URL(`${this.url.origin}/aem/start`);

    return {
      pageType: "Start",
      url: url
    };
  }

  get welcomePage(): PageType {
    const url = new URL(`${this.url.origin}/welcome`);

    return {
      pageType: "Welcome",
      url: url
    };
  }

  get dispatcherFlushPage(): PageType {
    const url = new URL(`${this.url.origin}/miscadmin#/etc/acs-commons/dispatcher-flush`);

    return {
      pageType: "Dispatcher Flush",
      url: url
    };
  }

  get runModesPage(): PageType {
    const url = new URL(`${this.url.origin}/system/console/status-slingsettings`);

    return {
      pageType: "Run Modes",
      url: url
    };
  }

  constructor(url: URL) {
    super(url);
  }
}
