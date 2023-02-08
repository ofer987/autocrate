import { random } from "lodash";

import { Servers } from "./models/server"
import { Server } from "./models/server"

import "./options.scss";

interface ServerOption extends Server {
  id: string
}

// const authorServers = {
//   localhost: {
//     name: "Localhost",
//     url: new URL("http://localhost:4502")
//   },
//   dev: {
//     name: "Dev",
//     url: new URL("https://author-dev-ams.ewp.thomsonreuters.com/")
//   },
//   qa: {
//     name: "QA",
//     url: new URL("https://author-qa-ams.ewp.thomsonreuters.com/")
//   },
//   uat: {
//     name: "UAT",
//     url: new URL("https://author-uat-ams.ewp.thomsonreuters.com/")
//   },
//   ppe: {
//     name: "PPE",
//     url: new URL("https://author-ppe-ams.ewp.thomsonreuters.com/")
//   },
//   production: {
//     name: "Production",
//     url: new URL("https://author-prod-ams.ewp.thomsonreuters.com/")
//   }
// };
//
// const publisherServers = {
//   localhost_publisher_1: {
//     name: "Localhost Publish",
//     url: new URL("http://localhost:4503"),
//   },
//   qa_publisher_1: {
//     name: "QA Publish",
//     url: new URL("http://publish1useast1-as.qa.ewp.thomsonreuters.com:4503"),
//   },
//   uat_publisher_1: {
//     name: "UAT Publish",
//     url: new URL("http://publish1useast1-as.uat.ewp.thomsonreuters.com:4503"),
//   },
//   ppe_publisher_1: {
//     name: "PPE Publish 1 US EAST 1",
//     url: new URL("http://publish1useast1-as.ppe.ewp.thomsonreuters.com:4503"),
//   },
//   ppe_publisher_2: {
//     name: "PPE Publish 2 US EAST 1",
//     url: new URL("http://publish2useast1-as.ppe.ewp.thomsonreuters.com:4503"),
//   },
//   ppe_publisher_3: {
//     name: "PPE Publish 1 US WEST 2",
//     url: new URL("http://publish1uswest2-as.ppe.ewp.thomsonreuters.com:4503"),
//   },
//   ppe_publisher_4: {
//     name: "PPE Publish 2 US WEST 2",
//     url: new URL("http://publish2uswest2-as.ppe.ewp.thomsonreuters.com:4503"),
//   },
//   prod_publisher_1: {
//     name: "Prod Publish 1 US EAST 1",
//     url: new URL("http://publish1useast1-as.prod.ewp.thomsonreuters.com:4503"),
//   },
//   prod_publisher_2: {
//     name: "Prod Publish 2 US EAST 1",
//     url: new URL("http://publish2useast1-as.prod.ewp.thomsonreuters.com:4503"),
//   },
//   prod_publisher_3: {
//     name: "Prod Publish 1 US WEST 2",
//     url: new URL("http://publish1uswest2-as.prod.ewp.thomsonreuters.com:4503"),
//   },
//   prod_publisher_4: {
//     name: "Prod Publish 2 US WEST 2",
//     url: new URL("http://publish2uswest2-as.prod.ewp.thomsonreuters.com:4503"),
//   },
// }

class Options {
  private AUTHORS_SELECTOR = "#servers #authors .list";
  private PUBLISHERS_SELECTOR = "#servers #publishers .list";

  private AUTHOR_SERVERS_SELECTOR = "#servers #authors .list > div";
  private PUBLISHER_SERVERS_SELECTOR = "#servers #publishers .list > div";
  private SAVE_BUTTON_ID = "save";

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
    this.saveButtonElement.addEventListener("mousedown", (_event: MouseEvent) => {
      this.save();
    });

    this.saveButtonElement.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "o" || event.key === "Enter" || event.key === " ") {
        this.save();
      }
    });
  }

  private restore(): void {
    // NOTE: Uncomment to set new authorServers and/or publisherServers values
    // Object.values(authorServers).forEach(item => {
    //   let optionElement = this.createOption(item);
    //
    //   this.authorServersElement.appendChild(optionElement);
    // });
    //
    // Object.values(publisherServers).forEach(item => {
    //   let optionElement = this.createOption(item);
    //
    //   this.publisherServersElement.appendChild(optionElement);
    // });
    // this.save();

    chrome.storage.sync.get(null, (savedValues: Servers) => {
      savedValues.authors.forEach((savedValue: Server) => {
        this.createOption(this.authorServersElement, savedValue);
      });

      savedValues.publishers.forEach((savedValue: Server) => {
        this.createOption(this.publisherServersElement, savedValue);
      });
    });
  }

  private createNewOption(list: HTMLDivElement): void {
    let result = {
      name: "",
      url: new URL("https://domain.com")
    }

    this.createOption(list, result);
  }

  private createOption(list: HTMLDivElement, value: Server): void {
    const id = random(0, 4294967296).toString();
    let resultElement = document.createElement("div");
    resultElement.id = id;

    let nameElement = document.createElement("input");
    nameElement.classList.add("name");
    // nameElement.htmlFor = id;
    nameElement.value = value.name;
    resultElement.appendChild(nameElement);

    let valueElement = document.createElement("input");
    valueElement.classList.add("url");
    valueElement.value = value.url.toString();
    resultElement.appendChild(valueElement);

    let buttonsElement = document.createElement("div");
    buttonsElement.classList.add("buttons");

    let deleteElement = document.createElement("button");
    deleteElement.textContent = "Delete";
    deleteElement.addEventListener("mousedown", ((_event: MouseEvent) => {
      resultElement.remove();
    }));
    deleteElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        resultElement.remove();
      }
    }));
    buttonsElement.appendChild(deleteElement);

    let addElement = document.createElement("button");
    addElement.textContent = "+";
    addElement.addEventListener("mousedown", ((_event: MouseEvent) => {
      this.createNewOption(list);
    }));
    addElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        this.createNewOption(list);
      }
    }));
    buttonsElement.appendChild(addElement);

    let shiftDownElement = document.createElement("button");
    shiftDownElement.textContent = "down";
    shiftDownElement.addEventListener("mousedown", ((_event: MouseEvent) => {
      this.shiftOptionDown(list, id);
    }));
    shiftDownElement.addEventListener("keydown", ((event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "o") {
        this.shiftOptionDown(list, id);
      }
    }));
    buttonsElement.appendChild(shiftDownElement);

    let shiftUpElement = document.createElement("button");
    shiftUpElement.textContent = "up";
    shiftUpElement.addEventListener("mousedown", ((_event: MouseEvent) => {
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
    let servers: ServerOption[] = [];

    const ids: string[] = [];
    list.childNodes.forEach((element: HTMLDivElement) => {
      const server: ServerOption = {
        id: element.id,
        name: (element.querySelector("input.name") as HTMLInputElement).value,
        url: new URL((element.querySelector("input.url") as HTMLInputElement).value)
      };

      ids.push(element.id);
      servers.push(server);
    });

    // Shift Server down
    let shiftedList: ServerOption[] = []
    let shiftedServer: ServerOption = null;
    for (const server of servers) {
      if (server.id !== id) {
        shiftedList.push(server);
      }

      if (shiftedServer) {
        shiftedList.push(shiftedServer);
        shiftedServer = null;
      }

      if (server.id === id) {
        shiftedServer = server;
      }
    }
    if (shiftedServer !== null) {
      shiftedList.push(shiftedServer);
      shiftedServer = null;
    }

    // Delete current list
    for (const id of ids) {
      document.getElementById(id).remove();
    }

    // Unserialize servers
    shiftedList.forEach((server: ServerOption) => {
      this.createOption(list, server);
    });
  }

  private shiftOptionUp(list: HTMLDivElement, id: string): void {
    // Serialize servers
    let servers: ServerOption[] = [];

    const ids: string[] = [];
    list.childNodes.forEach((element: HTMLDivElement) => {
      const server: ServerOption = {
        id: element.id,
        name: (element.querySelector("input.name") as HTMLInputElement).value,
        url: new URL((element.querySelector("input.url") as HTMLInputElement).value)
      };

      ids.push(element.id);
      servers.push(server);
    });

    // Shift Server down
    let shiftedList: ServerOption[] = []
    let shiftedServer: ServerOption = null;
    for (const server of servers.reverse()) {
      if (server.id !== id) {
        shiftedList.push(server);
      }

      if (shiftedServer) {
        shiftedList.push(shiftedServer);
        shiftedServer = null;
      }

      if (server.id === id) {
        shiftedServer = server;
      }
    }
    if (shiftedServer !== null) {
      shiftedList.push(shiftedServer);
      shiftedServer = null;
    }

    // Delete current list
    for (const id of ids) {
      document.getElementById(id).remove();
    }

    // Unserialize servers
    shiftedList.reverse().forEach((server: ServerOption) => {
      this.createOption(list, server);
    });
  }

  private save(): void {
    let servers = {
      authors: [],
      publishers: [],
    };

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

  private displaySaved(): void {
    alert("Saved");
  }
}

new Options();
