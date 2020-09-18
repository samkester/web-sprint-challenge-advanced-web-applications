import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

test("Fetches data and renders the bubbles", async () => {
  localStorage.setItem("token", "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98");

  render(<BubblePage />)

  const color = await screen.findByText("aliceblue");
  // since there's no way for the RTL to target objects with no text or role, this targets the ColorList instead of the bubbles proper,
  // but that's enough to be sure that we're fetching information from the API and rendering it

  expect(color).toBeVisible();
});
