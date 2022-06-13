import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";

export class EditorPage {
  static pathRegex = /^\/editor\.html(\/.*)\.html/

  private url: URL;

  static isPage(url: URL) {
    return EditorPage.pathRegex.test(url.pathname);
  }

  get id(): string {
    return 'editor-page';
  }

  get name(): string {
    return 'Editor';
  }

  get editorPage(): EditorPage {
    return this;
  }

  get previewPage(): PreviewPage {
    var url = new URL(`${this.url.origin}${this.url.pathname.match(EditorPage.pathRegex)[1]}\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): CrxDePage {
    var url = new URL(`${this.url.origin}/crx/de/index.jsp#${this.url.pathname.match(EditorPage.pathRegex)[1]}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): CrxPackMgrPage {
    var url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${this.url.pathname.match(EditorPage.pathRegex)[1]}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): UserAdminPage {
    var url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): SitesPage {
    var url = new URL(`${this.url.origin}/sites.html${this.url.pathname.match(EditorPage.pathRegex)[1]}`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    this.url = url;
  }
}
