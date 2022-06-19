import { kebabCase} from "lodash";

import { Servers, Server } from "./models/server"

import "./options.scss";

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
    chrome.storage.sync.get(null, (savedValues: Servers) => {
      savedValues.authors.forEach((saved_value: Server) => {
        let optionElement = this.createOption(saved_value)

        this.authorServersElement.appendChild(optionElement);
      });

      savedValues.publishers.forEach((saved_value: Server) => {
        let optionElement = this.createOption(saved_value)

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
