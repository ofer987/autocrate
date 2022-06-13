import { EditorPage } from "./editorPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";

export class UserAdminPage {
  static pathRegex = /^\/useradmin$/;
  private url: URL;

  static isPage(url: URL) {
    return UserAdminPage.pathRegex.test(url.pathname);
  }

  get id(): string {
    return 'user-admin';
  }

  get name(): string {
    return "User Admin";
  }

  get editorPage(): EditorPage {
    var url = new URL(`${this.url.origin}/editor.html/content\.html`);

    return new EditorPage(url);
  }

  get previewPage(): PreviewPage {
    var url = new URL(`${this.url.origin}\/content\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): CrxDePage {
    var url = new URL(`${this.url}/crx/de/index.jsp`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): CrxPackMgrPage {
    var url = new URL(`${this.url}/crx/packmgr/index.jsp`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): UserAdminPage {
    return this;
  }

  get sitesPage(): SitesPage {
    var url = new URL(`${this.url.origin}/sites.html/content`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    this.url = url;
  }
}
