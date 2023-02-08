export interface Servers {
  authorDispatchers: Server[];
  authors: Server[];
  publishers: Server[];
}

export interface Server {
  name: string;
  url: URL;
}
