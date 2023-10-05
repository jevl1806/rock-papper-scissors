import { ChoiceOption, choiceOptions } from "./options";

export function initialRender(app: HTMLElement) {
  let userChoice: ChoiceOption | null = null;

  const choicesButtons: HTMLButtonElement[] = choiceOptions.map(
    (choiceOption) => {
      const button = document.createElement("button");
      button.innerHTML = `
        <span style="display: none;">${choiceOption.name}</span>
        <span>${choiceOption.icon}</span>
      `;

      button.addEventListener("click", () => {
        userChoice = choiceOption;
        console.log({ userChoice });
      });

      return button;
    }
  );

  app?.append(...choicesButtons);
}
