import { AemPage, aemPageTypes } from "./aemPage";

export class DisabledPage extends AemPage {
  get getType(): aemPageTypes {
    return "Disabled Page";
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
}
