import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

// Mock next/image to avoid image loading issues in tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("Blogs Home Page", () => {
  it("should render without crashing", () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });

  it("should render main section with correct class", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("should display get started message with code reference", () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    expect(screen.getByText(/src\/app\/page\.tsx/i)).toBeInTheDocument();
  });

  it("should have Docs link", () => {
    render(<Home />);
    const docLink = screen.getByRole("link", { name: /Docs/i });
    expect(docLink).toBeInTheDocument();
    expect(docLink).toHaveAttribute("target", "_blank");
  });

  it("should have Learn link with correct attributes", () => {
    render(<Home />);
    const learnLink = screen.getByRole("link", { name: /Learn/i });
    expect(learnLink).toBeInTheDocument();
    expect(learnLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should have Templates link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /Templates/i })).toBeInTheDocument();
  });

  it("should have Deploy link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /Deploy/i })).toBeInTheDocument();
  });

  it("should have Vercel link", () => {
    render(<Home />);
    const vercelLink = screen.getByRole("link", { name: /By/i });
    expect(vercelLink).toHaveAttribute("href", expect.stringContaining("vercel.com"));
  });
});
