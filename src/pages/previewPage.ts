import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";

export class PreviewPage {
  static pathRegex = /\?(.*)wcmmode=disabled(.*)/
  private url: URL;

  static isPage(url: URL): boolean {
    return url.searchParams.get('wcmmode') === 'disabled';
  }

  get id(): string {
    return 'preview-page';
  }

  get name(): string {
    return 'Preview';
  }

  get editorPage(): EditorPage {
    var url = new URL(this.url.toString());

    url.pathname =`/editor.html${url.pathname}`;
    url.searchParams.delete('wcmmode');

    return new EditorPage(url);
  }

  get previewPage(): PreviewPage {
    return this;
  }

  get crxDePage(): CrxDePage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this.url.pathname.match(regex)[1] || this.url.pathname;
    var url = new URL(`${this.url.origin}/crx/de/index.jsp#${jcrPath}`);

    return new CrxDePage(url);
  }

  get crxPackMgrPage(): CrxPackMgrPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this.url.pathname.match(regex)[1] || this.url.pathname;
    var url = new URL(`${this.url.origin}/crx/packmgr/index.jsp#${jcrPath}`);

    return new CrxPackMgrPage(url);
  }

  get userAdminPage(): UserAdminPage {
    var url = new URL(`${this.url.origin}/useradmin`);

    return new UserAdminPage(url);
  }

  get sitesPage(): SitesPage {
    var regex = /(\/.*)\.html/;

    var jcrPath = this.url.pathname.match(regex)[1] || this.url.pathname;
    var url = new URL(`${this.url.origin}/sites.html${jcrPath}`);

    return new SitesPage(url);
  }

  constructor(url: URL) {
    this.url = url;
  }
}
