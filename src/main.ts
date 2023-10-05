import { choiceOptions } from "./options";

import "./style.css";

function initialRender(app: HTMLElement) {
  const choicesButtons: HTMLButtonElement[] = choiceOptions.map(
    (choiceOption) => {
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        console.log(`The choice clicked was: ${choiceOption.icon}`);
      });
      button.textContent = choiceOption.icon;

      return button;
    }
  );

  app?.append(...choicesButtons);
}

function main() {
  let app = document.getElementById("app")!;

  initialRender(app);
}

main();
