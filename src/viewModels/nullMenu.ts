import { MenuViewModel } from "./menuViewModel";

export class NullMenu extends MenuViewModel {
  protected IS_SELECTED_CLASS = "selected";
  protected ITEM_CLASS = "page";
  protected MENU_CLASS = "pages";

  get isNull(): boolean {
    return true;
  }

  display(): void {
    return;
  }

  hide(): void {
    return;
  }

  navigate(): void {
    return;
  }

  protected setSelectedIndex(): void {
    return;
  }

  protected setSelectedElementByUrl() {
    return;
  }
}
