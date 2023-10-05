import { describe, expect, it } from "vitest";
import { queries } from "@testing-library/dom";
import { initialRender } from "../src/setup";

const getApp = () => {
  const app = document.createElement("div");
  initialRender(app);

  return app;
};

describe("Given the game", () => {
  describe("When the game is loaded", () => {
    it("Then, the user should see all options", () => {
      const listChoiceNames = ["Scissor", "Paper", "Rock", "Lizard", "Spock"];
      const app = getApp();

      listChoiceNames.forEach((choiceName) => {
        const choiceButton = queries.getByRole(app, "button", {
          name: new RegExp(choiceName, "i"),
        });
        expect(choiceButton).toBeTruthy();
      });
    });
  });
});
