import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class CrxPackMgrPage extends AemPage {
  static pathRegex = /^\/crx\/packmgr\/index\.jsp#?(.*)$/;

  static isPage(url: URL): boolean {
    return CrxPackMgrPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "CRX / DE Package Manager";
  }

  get editorPage(): PageType {
    if (this.url.hash === "") {
      return {
        pageType: "Disabled Page",
        url: this.url
      };
    }

    const url = new URL(`${this.url.origin}/editor.html${this.url.hash.substring(1)}.html`);
    return {
      pageType: "Editor",
      url: url
    };
  }

  get previewPage(): PageType {
    if (this.url.hash === "") {
      return {
        pageType: "Disabled Page",
        url: this.url
      };
    }

    const url = new URL(`${this.url.origin}${this.url.hash.substring(1)}.html?wcmmode=disabled`);
    return {
      pageType: "Preview",
      url: url
    };
  }

  get crxDePage(): PageType {
    const url = new URL(this.url.toString());
    url.pathname = '/crx/de/index.jsp';

    return {
      pageType: "CRX / DE JCR Manager",
      url: url
    };
  }

  get crxPackMgrPage(): PageType {
    return {
      pageType: "Disabled Page",
      url: this.url
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
    if (this.url.hash === "") {
      return {
        pageType: "Disabled Page",
        url: this.url
      };
    }

    const url = new URL(`${this.url.origin}/sites.html${this.url.hash.substring(1)}`);
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
