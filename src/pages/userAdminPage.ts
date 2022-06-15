import { AemPage } from "./aemPage";
import { EditorPage } from "./editorPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";

export class UserAdminPage extends AemPage {
  static pathRegex = /^\/useradmin$/;

  static getName(): string {
    return "User Admin";
  }

  get url() {
    return this._url;
  }

  static isPage(url: URL) {
    return UserAdminPage.pathRegex.test(url.pathname);
  }

  get id(): string {
    return 'user-admin';
  }

  get editorPage(): AemPage {
    var url = new URL(`${this._url.origin}/editor.html/content\.html`);

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    var url = new URL(`${this._url.origin}\/content\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    var url = new URL(`${this._url}/crx/de/index.jsp`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    var url = new URL(`${this._url}/crx/packmgr/index.jsp`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    return this;
  }

  get sitesPage(): AemPage {
    var url = new URL(`${this._url.origin}/sites.html/content`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
