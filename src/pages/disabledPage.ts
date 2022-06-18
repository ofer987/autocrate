import { AemPage, aemPageTypes } from "./aemPage";
import { ConsolePage } from "./consolePage";

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
}
