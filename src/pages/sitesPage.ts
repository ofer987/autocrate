import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class SitesPage extends AemPage {
  static pathRegex = /^\/sites\.html(\/.*)/;

  static isPage(url: URL) {
    return SitesPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Sites";
  }

  get editorPage(): PageType {
    const url = new URL(`${this.url.origin}/editor.html${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}.html`);

    return {
      pageType: "Editor",
      url: url
    };
  }

  get previewPage(): PageType {
    const url = new URL(`${this.url.origin}${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}.html?wcmmode=disabled`);

    return {
      pageType: "Preview",
      url: url
    };
  }

  get crxDePage(): PageType {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp#${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}`);

    return {
      pageType: "CRX / DE JCR Manager",
      url: url
    };
  }

  get crxPackMgrPage(): PageType {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${(this.url.pathname.match(SitesPage.pathRegex) ?? [])[1]}`);

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
    return {
      pageType: "Disabled Page",
      url: this.url
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

  constructor(url: URL) {
    super(url);

    this.validate();
  }
}
