import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../ui/Button";
import React from "react";

describe("Button Component", () => {
  it("should render button with label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("should render button with correct type", () => {
    render(<Button label="Submit" type="submit" />);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should render button with correct size class", () => {
    render(<Button label="Small" size="small" />);
    const button = screen.getByRole("button", { name: /small/i });
    expect(button).toHaveClass("btn-small");
  });

  it("should render button with correct variant class", () => {
    render(<Button label="Outlined" variant="outlined" />);
    const button = screen.getByRole("button", { name: /outlined/i });
    expect(button).toHaveClass("btn-outlined");
  });

  it("should render button with correct color class", () => {
    render(<Button label="Primary" color="primary" />);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).toHaveClass("btn-primary");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button label="Disabled" disabled={true} />);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("should be disabled when loading prop is true", () => {
    render(<Button label="Loading" loading={true} />);
    const button = screen.getByRole("button", { name: /loading/i });
    expect(button).toBeDisabled();
  });

  it("should add full-width class when isFullWidth is true", () => {
    render(<Button label="Full" isFullWidth={true} />);
    const button = screen.getByRole("button", { name: /full/i });
    expect(button).toHaveClass("btn-full-width");
  });

  it("should add icon-only class when iconOnly is true", () => {
    render(<Button label="Icon" iconOnly={true} />);
    const button = screen.getByRole("button", { name: /icon/i });
    expect(button).toHaveClass("btn-icon-only");
  });

  it("should render icon when provided", () => {
    const icon = <span data-testid="test-icon">🔍</span>;
    render(<Button label="Search" icon={icon} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("should render icon with correct position class", () => {
    const icon = <span data-testid="test-icon">→</span>;
    render(<Button label="Next" icon={icon} iconPosition="right" />);
    const iconContainer = screen.getByTestId("test-icon").parentElement;
    expect(iconContainer).toHaveClass("btn-icon");
  });

  it("should call onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button label="Click" onClick={handleClick} />);
    
    const button = screen.getByRole("button", { name: /click/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button label="Disabled Click" disabled={true} onClick={handleClick} />);
    
    const button = screen.getByRole("button", { name: /disabled click/i });
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should not call onClick when loading", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button label="Loading Click" loading={true} onClick={handleClick} />);
    
    const button = screen.getByRole("button", { name: /loading click/i });
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply custom className", () => {
    render(<Button label="Custom" className="custom-class" />);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  it("should have all base button classes", () => {
    render(<Button label="Base" />);
    const button = screen.getByRole("button", { name: /base/i });
    expect(button).toHaveClass("btn");
  });

  it("should render with multiple variants together", () => {
    render(
      <Button
        label="Complex"
        size="large"
        variant="outlined"
        color="success"
        isFullWidth={true}
      />
    );
    const button = screen.getByRole("button", { name: /complex/i });
    expect(button).toHaveClass("btn-large", "btn-outlined", "btn-success", "btn-full-width");
  });
});
