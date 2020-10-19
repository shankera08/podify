import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// TODO: Add unit tests across the app
test("renders title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Podify/i);
  expect(linkElement).toBeInTheDocument();
});
