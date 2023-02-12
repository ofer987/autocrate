import { random } from "lodash";

import { Servers } from "./models/server";
import { Server } from "./models/server";

import "./options.scss";

interface ServerOption extends Server {
  id: string
}

class Options {
  private AUTHOR_DISPATCHERS_SELECTOR = "#servers #author-dispatchers .list";
  private AUTHORS_SELECTOR = "#servers #authors .list";
  private PUBLISHERS_SELECTOR = "#servers #publishers .list";

  private AUTHOR_DISPATCHER_SERVERS_SELECTOR = "#servers #author-dispatchers .list > div";
  private AUTHOR_SERVERS_SELECTOR = "#servers #authors .list > div";
  private PUBLISHER_SERVERS_SELECTOR = "#servers #publishers .list > div";
  private SAVE_BUTTON_ID = "save";

  private authorDispatcherServersElement: HTMLDivElement = document.querySelector(this.AUTHOR_DISPATCHERS_SELECTOR) as HTMLDivElement;
  private authorServersElement: HTMLDivElement = document.querySelector(this.AUTHORS_SELECTOR) as HTMLDivElement;
  private publisherServersElement: HTMLDivElement = document.querySelector(this.PUBLISHERS_SELECTOR) as HTMLDivElement;
  private saveButtonElement: HTMLButtonElement = document.getElementById(this.SAVE_BUTTON_ID) as HTMLButtonElement;

  constructor() {
    this.init();
  }

  private init(): void {
    this.restore();
    this.setKeyboardBindings();
  }

  private setKeyboardBindings(): void {
    this.saveButtonElement.addEventListener("mousedown", () => {
      this.save();
    });

    this.saveButtonElement.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "o" || event.key === "Enter" || event.key === " ") {
        this.save();
      }
    });
  }

  private restore(): void {
    chrome.storage.sync.get(null, (savedValues: Servers) => {
      savedValues.authorDispatchers.forEach((savedValue: Server) => {
        this.createOption(this.authorDispatcherServersElement, savedValue);
      });

      savedValues.authors.forEach((savedValue: Server) => {
        this.createOption(this.authorServersElement, savedValue);
      });

      savedValues.publishers.forEach((savedValue: Server) => {
        this.createOption(this.publisherServersElement, savedValue);
      });
    });
  }

  private createNewOption(list: HTMLDivElement): void {
    const result = {
      name: "",
      url: new URL("https://domain.com")
    };

    this.createOption(list, result);
  }

  private createOption(list: HTMLDivElement, value: Server): void {
    const id = random(0, 4294967296).toString();
    const resultElement = document.createElement("div");
    resultElement.id = id;

    const nameElement = document.createElement("input");
    nameElement.classList.add("name");
    nameElement.value = value.name;
    resultElement.appendChild(nameElement);

    const valueElement = document.createElement("input");
    valueElement.classList.add("url");
    valueElement.value = value.url.toString();
    resultElement.appendChild(valueElement);

    const buttonsElement = document.createElement("div");
    buttonsElement.classList.add("buttons");

    const deleteElement = document.createElement("button");
    deleteElement.textContent = "Delete";
    deleteElement.addEventListener("mousedown", (() => {
      resultElement.remove();
    }));
    deleteElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        resultElement.remove();
      }
    }));
    buttonsElement.appendChild(deleteElement);

    const addElement = document.createElement("button");
    addElement.textContent = "+";
    addElement.addEventListener("mousedown", (() => {
      this.createNewOption(list);
    }));
    addElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        this.createNewOption(list);
      }
    }));
    buttonsElement.appendChild(addElement);

    const shiftDownElement = document.createElement("button");
    shiftDownElement.textContent = "down";
    shiftDownElement.addEventListener("mousedown", (() => {
      this.shiftOptionDown(list, id);
    }));
    shiftDownElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        this.shiftOptionDown(list, id);
      }
    }));
    buttonsElement.appendChild(shiftDownElement);

    const shiftUpElement = document.createElement("button");
    shiftUpElement.textContent = "up";
    shiftUpElement.addEventListener("mousedown", (() => {
      this.shiftOptionUp(list, id);
    }));
    shiftUpElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        this.shiftOptionUp(list, id);
      }
    }));
    buttonsElement.appendChild(shiftUpElement);

    resultElement.appendChild(buttonsElement);
    list.appendChild(resultElement);
  }

  private shiftOptionDown(list: HTMLDivElement, id: string): void {
    // Serialize servers
    const servers = this.serialiseServers(list);

    // Shift Server down
    const shiftedList = this.shiftServer(servers, id);

    // Recreate list
    this.recreateList(list, shiftedList);
  }

  private shiftOptionUp(list: HTMLDivElement, id: string): void {
    // Serialize servers
    const servers = this.serialiseServers(list);

    // Shift Server down
    const shiftedList = this.shiftServer(servers.reverse(), id);

    // Recreate list
    this.recreateList(list, shiftedList.reverse());
  }

  private save(): void {
    const servers = {
      authorDispatchers: [],
      authors: [],
      publishers: [],
    };

    document.querySelectorAll(this.AUTHOR_DISPATCHER_SERVERS_SELECTOR).forEach((element: HTMLDivElement) => {
      const server = {
        name: (element.querySelector("input.name") as HTMLInputElement).value,
        url: (element.querySelector("input.url") as HTMLInputElement).value
      };

      servers.authorDispatchers.push(server);
    });

    document.querySelectorAll(this.AUTHOR_SERVERS_SELECTOR).forEach((element: HTMLDivElement) => {
      const server = {
        name: (element.querySelector("input.name") as HTMLInputElement).value,
        url: (element.querySelector("input.url") as HTMLInputElement).value
      };

      servers.authors.push(server);
    });

    document.querySelectorAll(this.PUBLISHER_SERVERS_SELECTOR).forEach((element: HTMLDivElement) => {
      const server = {
        name: (element.querySelector("input.name") as HTMLInputElement).value,
        url: (element.querySelector("input.url") as HTMLInputElement).value
      };

      servers.publishers.push(server);
    });

    chrome.storage.sync.set(servers, this.displaySaved);
  }

  private serialiseServers(list: HTMLDivElement): ServerOption[] {
    const servers: ServerOption[] = [];

    list.childNodes.forEach((element: HTMLDivElement) => {
      const server: ServerOption = {
        id: element.id,
        name: (element.querySelector("input.name") as HTMLInputElement).value,
        url: new URL((element.querySelector("input.url") as HTMLInputElement).value)
      };

      servers.push(server);
    });

    return servers;
  }

  private recreateList(list: HTMLDivElement, items: ServerOption[]): void {
    for (const id of items.map(item => item.id)) {
      document.getElementById(id).remove();
    }

    items.forEach((server: Server) => {
      this.createOption(list, server);
    });
  }

  private shiftServer(items: ServerOption[], idToShift: string): ServerOption[] {
    const shiftedList: ServerOption[] = [];
    let shiftedServer: ServerOption = null;
    for (const server of items) {
      if (server.id !== idToShift) {
        shiftedList.push(server);
      }

      if (shiftedServer) {
        shiftedList.push(shiftedServer);
        shiftedServer = null;
      }

      if (server.id === idToShift) {
        shiftedServer = server;
      }
    }
    if (shiftedServer !== null) {
      shiftedList.push(shiftedServer);
      shiftedServer = null;
    }

    return shiftedList;
  }

  private displaySaved(): void {
    alert("Saved");
  }
}

new Options();
