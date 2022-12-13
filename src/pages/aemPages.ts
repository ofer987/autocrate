import { AemPage } from "./aemPage";
import { PreviewPage } from "./previewPage";
import { EditorPage } from "./editorPage";
import { UserAdminPage } from"./userAdminPage";
import { CrxDePage } from "./crxDePage";
import { CrxPackMgrPage } from "./crxPackManagerPage";
import { SitesPage } from "./sitesPage";
import { NonAemPage } from "./nonAemPage";
import { ConsolePage } from "./consolePage";
import { StartPage } from "./startPage";
import { LoginPage } from "./loginPage";
import { WelcomePage } from "./welcomePage";

export class AemPages {
  static getAemPage(url: URL): AemPage {
    if (EditorPage.isPage(url)) return new EditorPage(url);
    if (PreviewPage.isPage(url)) return new PreviewPage(url);
    if (CrxDePage.isPage(url)) return new CrxDePage(url);
    if (CrxPackMgrPage.isPage(url)) return new CrxPackMgrPage(url);
    if (UserAdminPage.isPage(url)) return new UserAdminPage(url);
    if (SitesPage.isPage(url)) return new SitesPage(url);
    if (ConsolePage.isPage(url)) return new ConsolePage(url);
    if (StartPage.isPage(url)) return new StartPage(url);
    if (LoginPage.isPage(url)) return new LoginPage(url);
    if (WelcomePage.isPage(url)) return new WelcomePage(url);

    return new NonAemPage(url);
  }
}
