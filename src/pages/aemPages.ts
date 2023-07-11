import { aemPageTypes } from "./pageType";
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
import { DisabledPage } from "./disabledPage";
import { DispatcherFlushPage } from "./dispatcherFlushPage";

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
    if (DispatcherFlushPage.isPage(url)) return new DispatcherFlushPage(url);

    return new NonAemPage(url);
  }

  static createAemPage(pageType: aemPageTypes, url: URL): AemPage {
    switch (pageType) {
      case "Non AEM Page": return new NonAemPage(url);
      case "Disabled Page": return new DisabledPage(url);
      case "Editor": return new EditorPage(url);
      case "Preview": return new PreviewPage(url);
      case "CRX / DE JCR Manager": return new CrxDePage(url);
      case "CRX / DE Package Manager": return new CrxPackMgrPage(url);
      case "User Admin": return new UserAdminPage(url);
      case "Sites": return new SitesPage(url);
      case "Dispatcher Flush": return new DispatcherFlushPage(url);
      case "Console": return new ConsolePage(url);
      case "Login": return new LoginPage(url);
      case "Start": return new StartPage(url);
      case "Welcome": return new WelcomePage(url);
    }
  }
}
