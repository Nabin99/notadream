import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import React from "react";

describe("Admin App Component", () => {
  it("should render the app", () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  it("should display initial count", () => {
    render(<App />);
    expect(screen.getByText(/count is 0/i)).toBeInTheDocument();
  });

  it("should increment count when button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const button = screen.getByRole("button", { name: /count is/i });
    
    // Initial state
    expect(button).toHaveTextContent("count is 0");
    
    // Click once
    await user.click(button);
    expect(button).toHaveTextContent("count is 1");
    
    // Click again
    await user.click(button);
    expect(button).toHaveTextContent("count is 2");
  });

  it("should display Vite logo", () => {
    render(<App />);
    const viteLogoLink = screen.getByRole("link", { name: /vite logo/i });
    expect(viteLogoLink).toBeInTheDocument();
    expect(viteLogoLink).toHaveAttribute("href", "https://vitejs.dev");
  });

  it("should display React logo", () => {
    render(<App />);
    const reactLogoLink = screen.getByRole("link", { name: /react logo/i });
    expect(reactLogoLink).toBeInTheDocument();
    expect(reactLogoLink).toHaveAttribute("href", "https://react.dev");
  });

  it("should have external links with target _blank", () => {
    render(<App />);
    const links = screen.getAllByRole("link");
    
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });

  it("should display HMR instruction text", () => {
    render(<App />);
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/save to test HMR/i)).toBeInTheDocument();
  });

  it("should have count button with proper structure", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is/i });
    expect(button.parentElement).toHaveClass("card");
  });

  it("should properly update count multiple times", async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const button = screen.getByRole("button", { name: /count is/i });
    
    // Click 5 times
    for (let i = 0; i < 5; i++) {
      await user.click(button);
    }
    
    expect(button).toHaveTextContent("count is 5");
  });
});
