import { buildChoices, initialRender } from "./setup";
import { startGame } from "./game";

import "@/assets/style.css";
import "@/assets/layout.css";

function main() {
  const choices = buildChoices();

  initialRender(choices.map(([, li]) => li));
  startGame(
    choices.map(([choiceOption, li]) => [
      choiceOption,
      li.firstChild as HTMLButtonElement,
    ])
  );
}

main();
