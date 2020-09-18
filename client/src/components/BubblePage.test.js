import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

test("Fetches data and renders the bubbles", async () => {
  localStorage.setItem("token", "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98");

  render(<BubblePage />)

  const color = await screen.findByText("aliceblue");

  expect(color).toBeVisible();
});
