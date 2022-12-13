import { AemPage, aemPageTypes } from "./aemPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { DisabledPage } from "./disabledPage";
import { UserAdminPage } from "./userAdminPage";
import { ConsolePage } from "./consolePage";
import { LoginPage } from "./loginPage";
import { StartPage } from "./startPage";
import { WelcomePage } from "./welcomePage";

export class NonAemPage extends AemPage {
  get getType(): aemPageTypes {
    return "Non AEM Page";
  }

  get isEnabled(): boolean {
    return false;
  }

  get editorPage(): AemPage {
    return new DisabledPage(this.url);
  }

  get previewPage(): AemPage {
    return new DisabledPage(this.url);
  }

  get crxDePage(): AemPage {
    return new CrxDePage(new URL(`${this.url.origin}/crx/de/index.jsp`));
  }

  get crxPackMgrPage(): AemPage {
    return new CrxPackMgrPage(new URL(`${this.url.origin}/crx/packmgr/index.jsp`));
  }

  get userAdminPage(): AemPage {
    return new UserAdminPage(new URL(`${this.url.origin}/useradmin`));
  }

  get sitesPage(): AemPage {
    return new DisabledPage(this.url);
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
