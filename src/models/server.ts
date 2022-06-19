export interface Servers {
  authors: Server[];
  publishers: Server[];
}

export interface Server {
  name: string;
  url: string;
}
