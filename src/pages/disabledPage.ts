import { PageType, aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";

export class DisabledPage extends AemPage {
  get getType(): aemPageTypes {
    return "Disabled Page";
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
    return {
      pageType: "Disabled Page",
      url: this.url
    };
  }

  get crxPackMgrPage(): PageType {
    return {
      pageType: "Disabled Page",
      url: this.url
    };
  }

  get userAdminPage(): PageType {
    return {
      pageType: "Disabled Page",
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
}
