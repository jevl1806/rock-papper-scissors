import { ChoiceOption, choiceOptions } from "./options";

import choicesStyles from "@/assets/choice.module.css";

export const buildChoices = () => {
  const choicesItems: [ChoiceOption, HTMLLIElement][] = choiceOptions.map(
    (choiceOption) => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.classList.add(choicesStyles.choice_button);
      button.innerHTML = `
        <span style="display: none;">${choiceOption.name}</span>
        <span>${choiceOption.icon}</span>
      `;
      li.append(button);

      return [choiceOption, li];
    }
  );

  return choicesItems;
};

export function initialRender(choices: HTMLLIElement[]) {
  const containerChoices = document.querySelector(".container_choices");
  if (!containerChoices) throw new Error("container_choices not found");

  containerChoices.append(...choices);
}
