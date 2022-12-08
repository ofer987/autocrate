import { kebabCase} from "lodash";

import { Servers } from "./models/server"
import { Server } from "./models/server"

import "./options.scss";

const authorServers = {
  localhost: {
    name: "Localhost",
    url: new URL("http://localhost:4502")
  },
  dev: {
    name: "Dev",
    url: new URL("https://author-dev-ams.ewp.thomsonreuters.com/")
  },
  qa: {
    name: "QA",
    url: new URL("https://author-qa-ams.ewp.thomsonreuters.com/")
  },
  uat: {
    name: "UAT",
    url: new URL("https://author-uat-ams.ewp.thomsonreuters.com/")
  },
  ppe: {
    name: "PPE",
    url: new URL("https://author-ppe-ams.ewp.thomsonreuters.com/")
  },
  production: {
    name: "Production",
    url: new URL("https://author-prod-ams.ewp.thomsonreuters.com/")
  }
};

const publisherServers = {
  localhost_publisher_1: {
    name: "Localhost Publish",
    url: new URL("http://localhost:4503"),
  },
  qa_publisher_1: {
    name: "QA Publish",
    url: new URL("http://publish1useast1-as.qa.ewp.thomsonreuters.com:4503"),
  },
  uat_publisher_1: {
    name: "UAT Publish",
    url: new URL("http://publish1useast1-as.uat.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_1: {
    name: "PPE Publish 1 US EAST 1",
    url: new URL("http://publish1useast1-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_2: {
    name: "PPE Publish 2 US EAST 1",
    url: new URL("http://publish2useast1-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_3: {
    name: "PPE Publish 1 US WEST 2",
    url: new URL("http://publish1uswest2-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  ppe_publisher_4: {
    name: "PPE Publish 2 US WEST 2",
    url: new URL("http://publish2uswest2-as.ppe.ewp.thomsonreuters.com:4503"),
  },
  prod_publisher_1: {
    name: "Prod Publish 1 US EAST 1",
    url: new URL("http://publish1useast1-as.prod.ewp.thomsonreuters.com:4503"),
  },
  prod_publisher_2: {
    name: "Prod Publish 2 US EAST 1",
    url: new URL("http://publish2useast1-as.prod.ewp.thomsonreuters.com:4503"),
  },
  prod_publisher_3: {
    name: "Prod Publish 1 US WEST 2",
    url: new URL("http://publish1uswest2-as.prod.ewp.thomsonreuters.com:4503"),
  },
  prod_publisher_4: {
    name: "Prod Publish 2 US WEST 2",
    url: new URL("http://publish2uswest2-as.prod.ewp.thomsonreuters.com:4503"),
  },
}

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
        let optionElement = this.createOption(savedValue);

        this.authorServersElement.appendChild(optionElement);
      });

      savedValues.publishers.forEach((savedValue: Server) => {
        let optionElement = this.createOption(savedValue);

        this.publisherServersElement.appendChild(optionElement);
      });
    });
  }

  private createOption(value: Server): HTMLDivElement {
    let id = kebabCase(value.name);
    let resultElement = document.createElement("div");

    let nameElement = document.createElement("label");
    nameElement.classList.add("name");
    nameElement.htmlFor = id;
    nameElement.textContent = value.name;
    resultElement.appendChild(nameElement);

    let valueElement = document.createElement("input");
    valueElement.id = id;
    valueElement.value = value.url.toString();
    resultElement.appendChild(valueElement);

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
    resultElement.appendChild(deleteElement);

    return resultElement;
  }

  private save(): void {
    let servers = {
      authors: [],
      publishers: [],
    };

    document.querySelectorAll(this.AUTHOR_SERVERS_SELECTOR).forEach((element: HTMLDivElement) => {
      const server = { 
        name: (element.querySelector("label") as HTMLLabelElement).textContent,
        url: (element.querySelector("input") as HTMLInputElement).value
      };

      servers.authors.push(server);
    });

    document.querySelectorAll(this.PUBLISHER_SERVERS_SELECTOR).forEach((element: HTMLDivElement) => {
      const server = { 
        name: (element.querySelector("label") as HTMLLabelElement).textContent,
        url: (element.querySelector("input") as HTMLInputElement).value
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
