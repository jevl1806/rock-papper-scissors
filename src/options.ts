enum AvailableChoices {
  PAPER,
  ROCK,
  SCISSOR,
  LIZARD,
  SPOCK,
}

enum VersusResult {
  WINNER,
  LOSER,
  TIE,
}

interface ChoiceOption {
  readonly icon: string;
  readonly choice: AvailableChoices;
  versus(other: this): VersusResult;
}

const buildChoiceOption = (
  icon: string,
  choice: AvailableChoices,
  winAgainst: AvailableChoices[]
): ChoiceOption => ({
  icon,
  choice,
  versus(other) {
    if (this.choice === other.choice) return VersusResult.TIE;
    if (winAgainst.includes(other.choice)) return VersusResult.WINNER;

    return VersusResult.LOSER;
  },
});

export const choiceOptions: ChoiceOption[] = [
  buildChoiceOption("🗿", AvailableChoices.ROCK, [
    AvailableChoices.SCISSOR,
    AvailableChoices.LIZARD,
  ]),
  buildChoiceOption("✂", AvailableChoices.SCISSOR, [
    AvailableChoices.PAPER,
    AvailableChoices.LIZARD,
  ]),
  buildChoiceOption("🧻", AvailableChoices.PAPER, [
    AvailableChoices.ROCK,
    AvailableChoices.SPOCK,
  ]),
  buildChoiceOption("🦎", AvailableChoices.LIZARD, [
    AvailableChoices.PAPER,
    AvailableChoices.SPOCK,
  ]),
  buildChoiceOption("🖖", AvailableChoices.SPOCK, [
    AvailableChoices.ROCK,
    AvailableChoices.SCISSOR,
  ]),
];
