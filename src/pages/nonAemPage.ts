import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class NonAemPage extends AemPage {
  get getType(): aemPageTypes {
    return "Non AEM Page";
  }

  get isEnabled(): boolean {
    return false;
  }

  get editorPage(): PageType {
    return {
      pageType: "Disabled Page",
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
    return {
      pageType: "User Admin",
      url: this.url
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

  get dispatcherFlushPage(): PageType {
    const url = new URL(`${this.url.origin}/miscadmin#/etc/acs-commons/dispatcher-flush`);

    return {
      pageType: "Dispatcher Flush",
      url: url
    };
  }

  constructor(url: URL) {
    super(url);
  }
}
