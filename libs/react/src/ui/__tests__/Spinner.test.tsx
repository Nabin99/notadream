import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Spinner } from "../../ui/Spinner";
import React from "react";

describe("Spinner Component", () => {
  it("should render spinner element", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector(".loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should render spinner with small size by default", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector(".loading-spinner-small");
    expect(spinner).toBeInTheDocument();
  });

  it("should render spinner with medium size when specified", () => {
    const { container } = render(<Spinner size="medium" />);
    const spinner = container.querySelector(".loading-spinner-medium");
    expect(spinner).toBeInTheDocument();
  });

  it("should render spinner with large size when specified", () => {
    const { container } = render(<Spinner size="large" />);
    const spinner = container.querySelector(".loading-spinner-large");
    expect(spinner).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<Spinner className="custom-class" />);
    const spinner = container.querySelector(".loading-spinner");
    expect(spinner).toHaveClass("custom-class");
  });

  it("should have both size and custom classes", () => {
    const { container } = render(
      <Spinner size="large" className="my-custom-spinner" />
    );
    const spinner = container.querySelector(".loading-spinner");
    expect(spinner).toHaveClass("loading-spinner-large");
    expect(spinner).toHaveClass("my-custom-spinner");
  });

  it("should not have extra whitespace in className", () => {
    const { container } = render(<Spinner size="small" className="" />);
    const spinner = container.querySelector(".loading-spinner");
    const classList = spinner?.className || "";
    // The trimEnd() in the component should remove trailing whitespace
    expect(classList).not.toMatch(/\s+$/);
  });
});
