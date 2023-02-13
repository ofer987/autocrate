import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class UserAdminPage extends AemPage {
  static pathRegex = /^\/useradmin$/;

  static isPage(url: URL) {
    return UserAdminPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "User Admin";
  }

  get editorPage(): PageType {
      return {
        pageType: "Disabled Page",
        url: this.url
      }
  }

  get previewPage(): PageType {
      return {
        pageType: "Disabled Page",
        url: this.url
      }
  }

  get crxDePage(): PageType {
    const url = new URL(`${this.url.origin}/crx/de/index.jsp`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  get crxPackMgrPage(): PageType {
    const url = new URL(`${this.url.origin}/crx/packmgr/index.jsp`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  get userAdminPage(): PageType {
    return {
      pageType: "User Admin",
      url: this.url
    }
  }

  get sitesPage(): PageType {
    const url = new URL(`${this.url.origin}/sites.html/content`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  get consolePage(): PageType {
    const url = new URL(`${this.url.origin}/system/console`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  get loginPage(): PageType {
    const url = new URL(`${this.url.origin}/libs/granite/core/content/login.html`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  get startPage(): PageType {
    const url = new URL(`${this.url.origin}/aem/start`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  get welcomePage(): PageType {
    const url = new URL(`${this.url.origin}/welcome`);

    return {
      pageType: "Editor",
      url: url
    }
  }

  constructor(url: URL) {
    super(url);
  }
}
