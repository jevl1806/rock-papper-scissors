enum AvailableChoices {
  PAPER,
  ROCK,
  SCISSOR,
  LIZARD,
  SPOCK,
}

export enum VersusResult {
  WINNER,
  LOSER,
  TIE,
}

export interface ChoiceOption {
  readonly icon: string;
  readonly name: string;
  readonly choice: AvailableChoices;
  versus(other: this): VersusResult;
}

interface BuildChoiceParams {
  icon: string;
  name: string;
  choice: AvailableChoices;
  winAgainst: AvailableChoices[];
}

const buildChoiceOption = ({
  icon,
  name,
  choice,
  winAgainst,
}: BuildChoiceParams): ChoiceOption => ({
  icon,
  choice,
  name,
  versus(other) {
    if (this.choice === other.choice) return VersusResult.TIE;
    if (winAgainst.includes(other.choice)) return VersusResult.WINNER;

    return VersusResult.LOSER;
  },
});

export const choiceOptions: ChoiceOption[] = [
  buildChoiceOption({
    icon: "🗿",
    name: "Rock",
    choice: AvailableChoices.ROCK,
    winAgainst: [AvailableChoices.SCISSOR, AvailableChoices.LIZARD],
  }),
  buildChoiceOption({
    icon: "✂",
    name: "Scissor",
    choice: AvailableChoices.SCISSOR,
    winAgainst: [AvailableChoices.PAPER, AvailableChoices.LIZARD],
  }),
  buildChoiceOption({
    icon: "📃",
    name: "Paper",
    choice: AvailableChoices.PAPER,
    winAgainst: [AvailableChoices.ROCK, AvailableChoices.SPOCK],
  }),
  buildChoiceOption({
    icon: "🦎",
    name: "Lizard",
    choice: AvailableChoices.LIZARD,
    winAgainst: [AvailableChoices.PAPER, AvailableChoices.SPOCK],
  }),
  buildChoiceOption({
    icon: "🖖",
    name: "Spock",
    choice: AvailableChoices.SPOCK,
    winAgainst: [AvailableChoices.ROCK, AvailableChoices.SCISSOR],
  }),
];
