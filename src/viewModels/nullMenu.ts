import { MenuViewModel } from "./menuViewModel";

export class NullMenu extends MenuViewModel {
  protected IS_SELECTED_CLASS = "selected";
  protected ITEM_CLASS = "page";
  protected MENU_CLASS = "pages";

  get isNull(): boolean {
    return true;
  }

  display(): void {
  }

  hide(): void {
  }

  navigate(): void {
  }

  protected setSelectedIndex(_value: number) {
  }

  protected setSelectedElementByUrl() {
  }
}
