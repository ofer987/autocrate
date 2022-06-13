import { EditorPage } from "./editorPage";
import { CrxDePage } from "./crxDePage";
import { UserAdminPage } from "./userAdminPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";

export class CrxPackMgrPage {
  static pathRegex = /^\/crx\/packmgr\/index\.jsp#?(.*)$/;
  private url: URL;

  static isPage(url: URL): boolean {
    return CrxPackMgrPage.pathRegex.test(url.pathname);
  }

  get id(): string {
    return 'crx-pack-mgr';
  }

  get name(): string {
    return "CRX / Package Manager";
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
    var url = new URL(this.url.toString());
    url.pathname = '/crx/de/index.jsp';

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): CrxPackMgrPage {
    return this;
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
