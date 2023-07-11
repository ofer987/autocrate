export type aemPageTypes = "Non AEM Page"
  | "Disabled Page"
  | "Editor"
  | "Preview"
  | "CRX / DE JCR Manager"
  | "CRX / DE Package Manager"
  | "User Admin"
  | "Sites"
  | "Dispatcher Flush"
  | "Console"
  | "Login"
  | "Start"
  | "Welcome";

export interface PageType {
  pageType: aemPageTypes;
  url: URL;
}
