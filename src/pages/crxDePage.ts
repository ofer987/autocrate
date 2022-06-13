import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";

export class CrxDePage {
  static pathRegex = /^\/crx\/de\/index\.jsp$/;
  private url: URL;

  static isPage(url: URL): boolean {
    return CrxDePage.pathRegex.test(url.pathname);
  }

  get name(): string {
    return "CRX / DE Page";
  }

  get id(): string {
    return "crx-de";
  }

  get editorPage(): EditorPage {
    var url = new URL(`${this.url.origin}/editor.html${this.url.hash.substring(1)}\.html`);

    return new EditorPage(url);
  }

  get previewPage(): PreviewPage {
    var url = new URL(`${this.url.origin}${this.url.hash.substring(1)}\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): CrxDePage {
    return this;
  }

  get crxPackMgrPage(): CrxPackMgrPage {
    var url = new URL(this.url.toString());
    url.pathname = '/crx/packmgr/index.jsp';

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): UserAdminPage {
    var url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): SitesPage {
    var url = new URL(`${this.url.origin}/sites.html${this.url.hash.substring(1)}`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    this.url = url;
  }
}
