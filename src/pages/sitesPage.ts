import { EditorPage } from "./editorPage";
import { UserAdminPage } from "./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { PreviewPage } from "./previewPage";

export class SitesPage {
  static pathRegex = /^\/sites\.html(\/.*)/
  private url: URL;

  static isPage(url: URL) {
    return SitesPage.pathRegex.test(url.pathname);
  }

  get id(): string {
    return 'sites-page';
  }

  get name(): string {
    return 'Sites';
  }

  get editorPage(): EditorPage {
    var url = new URL(`${this.url.origin}/editor.html${this.url.pathname.match(SitesPage.pathRegex)[1]}\.html`);

    return new EditorPage(url);
  }

  get previewPage(): PreviewPage {
    var url = new URL(`${this.url.origin}${this.url.pathname.match(SitesPage.pathRegex)[1]}\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): CrxDePage {
    var url = new URL(`${this.url.origin}/crx/de/index.jsp#${this.url.pathname.match(SitesPage.pathRegex)[1]}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): CrxPackMgrPage {
    var url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${this.url.pathname.match(SitesPage.pathRegex)[1]}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): UserAdminPage {
    var url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): SitesPage {
    return this;
  }

  constructor(url: URL) {
    this.url = url;
  }
}
