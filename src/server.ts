export class Server {
  private name: string;
  private url: URL;

  constructor(name: string, url: URL) {
    this.name = name;
    this.url = url;
  }

  toString() {
    return this.url.toString();
  }
}
