import { PreviewPage } from "./previewPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";

export class AemPages {
  static getPage(url: URL) {
    url = new URL(url.toString());

    if (EditorPage.isPage(url)) return new EditorPage(url);
    if (PreviewPage.isPage(url)) return new PreviewPage(url);
    if (CrxDePage.isPage(url)) return new CrxDePage(url);
    if (CrxPackMgrPage.isPage(url)) return new CrxPackMgrPage(url);
    if (UserAdminPage.isPage(url)) return new UserAdminPage(url);
    if (SitesPage.isPage(url)) return new SitesPage(url);

    throw `Sorry the url (${url}) is not an AEM page`;
  }
}
