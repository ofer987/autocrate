import { Server } from "./server";

export interface Options {
  localhost: Server;
  dev: Server;
  qa: Server;
  uat: Server;
  ppe: Server;
  production: Server;
}
