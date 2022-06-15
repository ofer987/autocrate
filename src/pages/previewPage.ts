import { AemPage } from "./aemPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";

export class PreviewPage extends AemPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/

  static getName(): string {
    return 'Preview';
  }

  static isPage(url: URL): boolean {
    return url.searchParams.get('wcmmode') === 'disabled';
  }

  get id(): string {
    return 'preview-page';
  }

  get editorPage(): AemPage {
    var url = new URL(this._url.toString());

    url.pathname =`/editor.html${url.pathname}`;
    url.searchParams.delete('wcmmode');

    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    return this;
  }

  get crxDePage(): AemPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this._url.pathname.match(regex)[1] || this._url.pathname;
    var url = new URL(`${this._url.origin}/crx/de/index.jsp#${jcrPath}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): AemPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this._url.pathname.match(regex)[1] || this._url.pathname;
    var url = new URL(`${this._url.origin}/crx/packmgr/index.jsp#${jcrPath}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): AemPage {
    var url = new URL(`${this._url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): AemPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this._url.pathname.match(regex)[1] || this._url.pathname;
    var url = new URL(`${this._url.origin}/sites.html${jcrPath}`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
