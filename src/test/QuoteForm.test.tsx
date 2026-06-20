import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuoteForm from "@/components/QuoteForm";

describe("QuoteForm", () => {
  it("renders form with all required fields", () => {
    render(<QuoteForm />);
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /request free quote/i })).toBeInTheDocument();
  });

  it("displays form title", () => {
    render(<QuoteForm />);
    expect(screen.getByText("Get a Free Quote")).toBeInTheDocument();
  });
});
