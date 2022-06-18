import { AemPage, aemPageTypes } from "./aemPage";
import { DisabledPage } from "./disabledPage";
import { EditorPage } from "./editorPage";
import { CrxDePage } from "./crxDePage";
import { UserAdminPage } from "./userAdminPage";
import { SitesPage } from "./sitesPage";
import { PreviewPage } from "./previewPage";
import { ConsolePage } from "./consolePage";

export class CrxPackMgrPage extends AemPage {
  static pathRegex = /^\/crx\/packmgr\/index\.jsp#?(.*)$/;

  static isPage(url: URL): boolean {
    return CrxPackMgrPage.pathRegex.test(url.pathname);
  }

  get getType(): aemPageTypes {
    return "Package Manager";
  }

  get id(): string {
    return 'crx-pack-mgr';
  }

  get editorPage(): AemPage {
    if (this._url.hash === "") {
      return new DisabledPage(this.url);
    }

    var url = new URL(`${this._url.origin}/editor.html${this._url.hash.substring(1)}\.html`);
    return new EditorPage(url);
  }

  get previewPage(): AemPage {
    if (this._url.hash === "") {
      return new DisabledPage(this.url);
    }

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
    if (this._url.hash === "") {
      return new DisabledPage(this.url);
    }

    var url = new URL(`${this._url.origin}/sites.html${this._url.hash.substring(1)}`);
    return new SitesPage(url);
  }

  get consolePage(): AemPage {
    const url = new URL(`${this.url.origin}/system/console`);

    return new ConsolePage(url);
  }

  constructor(url: URL) {
    super(url);
  }
}
