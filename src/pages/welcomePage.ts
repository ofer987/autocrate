import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class WelcomePage extends AemPage {
  static pathRegex = /^(\/libs\/cq\/core\/content)?\/welcome\.html$/;

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
    return {
      pageType: "Disabled Page",
      url: this.url
    };
  }

  get crxDePage(): PageType {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp`);

    return {
      pageType: "CRX / DE JCR Manager",
      url: url
    };
  }

  get crxPackMgrPage(): PageType {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp`);

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
    const url = new URL(`${this.url.origin}/sites.html/content`);

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
    return {
      pageType: "Disabled Page",
      url: this.url
    };
  }

  constructor(url: URL) {
    super(url);
  }
}
