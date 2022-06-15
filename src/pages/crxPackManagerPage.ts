import { AemPage } from "./aemPage";
import { EditorPage } from "./editorPage";
import { CrxDePage } from "./crxDePage";
import { UserAdminPage } from "./userAdminPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";

export class CrxPackMgrPage extends AemPage {
  static pathRegex = /^\/crx\/packmgr\/index\.jsp#?(.*)$/;

  static getName(): string {
    return "CRX / Package Manager";
  }

  static isPage(url: URL): boolean {
    return CrxPackMgrPage.pathRegex.test(url.pathname);
  }

  get id(): string {
    return 'crx-pack-mgr';
  }

  get editorPage(): AemPage {
    var url = new URL(`${this._url.origin}/editor.html${this._url.hash.substring(1)}\.html`);

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    var url = new URL(`${this._url.origin}${this._url.hash.substring(1)}\.html?wcmmode=disabled`);

    return new PreviewPage(url);
  }

  get crxDePage(): AemPage {
    var url = new URL(this._url.toString());
    url.pathname = '/crx/de/index.jsp';

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    return this;
  }

  get userAdminPage(): AemPage {
    var url = new URL(`${this._url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    var url = new URL(`${this._url.origin}/sites.html${this._url.hash.substring(1)}`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
