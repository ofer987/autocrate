import { AemPage, aemPageTypes } from "./aemPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { DisabledPage } from "./disabledPage";
import { UserAdminPage } from "./userAdminPage";

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

  constructor(url: URL) {
    super(url);
  }
}