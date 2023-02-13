import { aemPageTypes } from "./pageType";
import { AemPage } from "./aemPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class DisabledPage extends AemPage {
  get getType(): aemPageTypes {
    return "Disabled Page";
  }

  get isEnabled(): boolean {
    return false;
  }

  get editorPage(): AemPage {
    return this;
  }

  get previewPage(): AemPage {
    return this;
  }

  get crxDePage(): AemPage {
    return this;
  }

  get crxPackMgrPage(): AemPage {
    return this;
  }

  get userAdminPage(): AemPage {
    return this;
  }

  get sitesPage(): AemPage {
    return this;
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
}
