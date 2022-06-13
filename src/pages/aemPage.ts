export class AemPage {
  private _url: URL;

  protected get url(): URL {
    return this._url;
  }

  constructor(url: URL) {
    this._url = url;
  }

  toString() {
    return this.url.toString();
  }
}
