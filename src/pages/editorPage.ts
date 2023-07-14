import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class EditorPage extends AemPage {
  static pathRegex = /^\/editor\.html(\/.*)\.html/;

  static isPage(url: URL) {
    return EditorPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Editor";
  }

  get editorPage(): PageType {
    return {
      pageType: "Disabled Page",
      url: this.url
    };
  }

  get previewPage(): PageType {
    const url = new URL(`${this.url.origin}${(this.url.pathname.match(EditorPage.pathRegex) || [])[1]}.html?wcmmode=disabled`);

    return {
      pageType: "Preview",
      url: url
    };
  }

  get crxDePage(): PageType {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp#${(this.url.pathname.match(EditorPage.pathRegex) || [])[1]}`);

    return {
      pageType: "CRX / DE JCR Manager",
      url: url
    };
  }

  get crxPackMgrPage(): PageType {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${(this.url.pathname.match(EditorPage.pathRegex) || [])[1]}`);

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
    const url = new URL(`${this.url.origin}/sites.html${(this.url.pathname.match(EditorPage.pathRegex) || [])[1]}`);

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
