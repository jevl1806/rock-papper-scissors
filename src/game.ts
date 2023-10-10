import confetti from "canvas-confetti";
import { ChoiceOption, VersusResult, choiceOptions } from "./options";

import choicesStyles from "@/assets/choice.module.css";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomChoice = () =>
  choiceOptions[Math.floor(Math.random() * choiceOptions.length)];

const changeDescription = (title: string) => {
  const description =
    document.querySelector<HTMLParagraphElement>("#description");
  if (!description) throw new Error("description not found");

  description.textContent = title;
};

const resetGame = ({
  userChoiceButton,
  cpuChoiceButton,
  playAgainButton,
}: {
  userChoiceButton: HTMLButtonElement;
  cpuChoiceButton: HTMLButtonElement;
  playAgainButton: HTMLButtonElement;
}) => {
  playAgainButton.classList.add("hidden");
  updateFinalMessage();
  changeDescription("Choose a move");
  userChoiceButton.classList.remove(
    choicesStyles["choice_button--shadow-yellow"]
  );
  cpuChoiceButton.classList.remove(
    choicesStyles["choice_button--shadow-green"]
  );
};

const updateFinalMessage = (result?: VersusResult) => {
  const description =
    document.querySelector<HTMLParagraphElement>("#final-message");
  if (!description) throw new Error("description not found");

  let message: string;
  switch (result) {
    case VersusResult.WINNER:
      message = "Congratulations!! You are the WINNER 😎";
      break;
    case VersusResult.LOSER:
      message = "Machine is the winner 🤖 and you LOSE!!";
      break;
    case VersusResult.TIE:
      message = "It's a TIE 😐. Try again!!";
      break;
    default:
      message = "";
  }

  description.textContent = message;
};

const animateCpuChoice = async (
  choices: [ChoiceOption, HTMLButtonElement][],
  selectedButton: HTMLButtonElement
) => {
  changeDescription("CPU is choosing...");

  for (let i = 1; i <= 3; i++)
    for (const [_, choiceButton] of choices) {
      choiceButton.classList.add(choicesStyles["choice_button--shadow-green"]);
      await wait(300 / i);
      choiceButton.classList.remove(
        choicesStyles["choice_button--shadow-green"]
      );
    }

  wait(100);
  selectedButton.classList.add(choicesStyles["choice_button--shadow-green"]);

  changeDescription("¡Let the battle begin!");
};

export const startGame = (choices: [ChoiceOption, HTMLButtonElement][]) => {
  let userChoice: ChoiceOption | null = null;
  let cpuChoice: ChoiceOption | null = null;

  const playAgainButton =
    document.querySelector<HTMLButtonElement>("#restart-btn");
  if (!playAgainButton) throw new Error("playAgainButton not found");

  choices.forEach(([choiceOption, choiceButton]) => {
    choiceButton.addEventListener("click", () => {
      if (userChoice) return;

      userChoice = choiceOption;
      cpuChoice = getRandomChoice();

      choiceButton.classList.add(choicesStyles["choice_button--shadow-yellow"]);

      setTimeout(async () => {
        const cpuChoiceButton = choices.find(
          ([choiceOption]) => choiceOption === cpuChoice
        )?.[1];
        if (!cpuChoiceButton) throw new Error("selectedChoiceButton not found");

        await animateCpuChoice(choices, cpuChoiceButton);

        const isUserWinner = userChoice!.versus(cpuChoice!)!;
        updateFinalMessage(isUserWinner);
        if (isUserWinner === VersusResult.WINNER) confetti();

        playAgainButton.classList.remove("hidden");

        playAgainButton.addEventListener("click", () => {
          userChoice = null;
          cpuChoice = null;

          resetGame({
            userChoiceButton: choiceButton,
            cpuChoiceButton,
            playAgainButton,
          });
        });
      }, 400);
    });
  });
};
